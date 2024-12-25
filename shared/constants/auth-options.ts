// next-auth
import { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
// prisma
import { prisma } from '@/prisma/prisma-client';
import { UserRole } from '@prisma/client';
// bcrypt
import { compare, hashSync } from 'bcrypt';

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: 'USER' as UserRole,
        };
      },
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        // Если поля пустые, то
        if (!credentials) {
          return null;
        }

        // Ищем пользователя в БД по email
        const foundUser = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        // Если пользователь не найден, то
        if (!foundUser) {
          return null;
        }

        // Сравниваем пароль, введенный пользователем при авторизации и пароль из БД
        const isPasswordValid = await compare(credentials.password, foundUser.password);

        // Если пароли не совпадают, то
        if (!isPasswordValid) {
          return null;
        }

        // Если пользователь не был зарегестрирован, то
        if (!foundUser.verified) {
          return null;
        }

        return {
          id: foundUser.id,
          name: foundUser.fullName,
          email: foundUser.email,
          role: foundUser.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // Функция, которая обрабатывает вход всеми тремя способами - через credential, github или google
    async signIn({ user, account }) {
      try {
        // Если логин через почту и пароль, то продолжаем авторизацию через CredentialsProvider
        if (account?.provider === 'credentials') {
          return true;
        }

        // Если через GitHub или Google и у пользователя нет почты, то прекращаем авторизацию
        if (!user.email) {
          return false;
        }

        // Если email есть, то ищем пользователя в БД по email или по id github или google
        const foundUser = await prisma.user.findFirst({
          where: {
            OR: [
              { provider: account?.provider, providerId: account?.providerAccountId },
              { email: user.email },
            ],
          },
        });

        // Если такой пользователь нашелся, то обновляем ему в БД provider и providerId
        if (foundUser) {
          await prisma.user.update({
            where: {
              id: foundUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });
          return true;
        }

        // Иначе, если такого пользователя в БД нет, то создаем его
        await prisma.user.create({
          data: {
            email: user.email,
            password: hashSync(user.id.toString(), 10),
            fullName: user.name || 'User #' + user.id,
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });

        return true;
      } catch (error) {
        console.error('[SIGNIN] error', error);
        return false;
      }
    },

    async jwt({ token }) {
      if (!token.email) {
        return token;
      }

      const foundUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (foundUser) {
        token.id = String(foundUser.id);
        token.name = foundUser.fullName;
        token.email = foundUser.email;
        token.role = foundUser.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
};
