import { Prisma } from '@prisma/client';
import { categories, ingredients, products } from './constants';
import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  pizzaSize,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  pizzaSize?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomNumber(190, 600),
    pizzaType,
    pizzaSize,
  } as Prisma.ProductItemUncheckedCreateInput;
};

// функция генерирует фейковые данные
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

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Пепперони фреш',
      imageUrl:
        'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Сырная',
      imageUrl:
        'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Чоризо фреш',
      imageUrl:
        'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // Пицца "Пепперони фреш"
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        pizzaSize: 20,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 2,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 2,
        pizzaSize: 40,
      }),

      // Пицца "Сырная"
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        pizzaSize: 20,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        pizzaSize: 40,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        pizzaSize: 20,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        pizzaSize: 40,
      }),

      // Пицца "Чоризо фреш"
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 1,
        pizzaSize: 20,
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 2,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 2,
        pizzaSize: 40,
      }),
    ],
  });
}

// функция очищает данные
async function down() {
  // sql запрос TRUNCATE TABLE "User" RESTART IDENTITY CASCADE
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`; // для очищения таблицы и обнуления счета id
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
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
