import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

// функция генерирует данные
async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User (test)',
        email: 'user@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin (test)',
        email: 'admin@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });
}

// функция очищает данные
async function down() {
  // sql запрос TRUNCATE TABLE "User" RESTART IDENTITY CASCADE
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`; // для очищения таблицы и обнуления счета id
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

// После очищения и создания фейковых данных отключаем таблицу
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
