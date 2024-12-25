// next-auth
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
// prisma
import { prisma } from '@/prisma/prisma-client';
// bcrypt
import { compare } from 'bcrypt';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
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
          id: String(foundUser.id),
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
    async jwt({ token }) {
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
