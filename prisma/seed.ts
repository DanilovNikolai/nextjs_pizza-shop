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
    price: randomNumber(300, 600),
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

  const pizza_1 = await prisma.product.create({
    data: {
      name: 'Песто',
      imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/pizza/pesto.png',
      description:
        'Цыпленок, соус песто, кубики брынзы, томаты, моцарелла, фирменный соус альфредо',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 8),
      },
    },
  });

  const pizza_2 = await prisma.product.create({
    data: {
      name: 'Сырный цыпленок',
      imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/pizza/sirni_ciplyonok.png',
      description:
        'Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, фирменный соус альфредо, чеснок',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 12),
      },
    },
  });

  const pizza_3 = await prisma.product.create({
    data: {
      name: 'Ветчина и грибы',
      imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/pizza/vetchina_i_gribi.png',
      description: 'Ветчина, шампиньоны, увеличенная порция моцареллы, фирменный томатный соус',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(2, 20),
      },
    },
  });

  const pizza_4 = await prisma.product.create({
    data: {
      name: 'Чоризо фреш',
      imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/pizza/chorizo_fresh.png',
      description: 'Острые колбаски чоризо, сладкий перец, моцарелла, фирменный томатный соус',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(3, 15),
      },
    },
  });

  const pizza_5 = await prisma.product.create({
    data: {
      name: 'Пепперони фреш',
      imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/pizza/pepperoni_fresh.png',
      description:
        'Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(3, 17),
      },
    },
  });

  const pizza_6 = await prisma.product.create({
    data: {
      name: 'Жюльен',
      imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/pizza/zhylien.png',
      description:
        'Цыпленок, шампиньоны, ароматный грибной соус, лук, сухой чеснок, моцарелла, смесь сыров чеддер и пармезан, фирменный соус альфредо',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 15),
      },
    },
  });

  const pizza_7 = await prisma.product.create({
    data: {
      name: 'Сырная',
      imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/pizza/sirnaya.png',
      description: 'Моцарелла, сыры чеддер и пармезан, фирменный соус альфредо',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(1, 18),
      },
    },
  });

  const pizza_8 = await prisma.product.create({
    data: {
      name: 'Цыпленок барбекю',
      imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/pizza/ciplyonok_barbeku.png',
      description: 'Цыпленок, бекон, соус барбекю, красный лук, моцарелла, фирменный томатный соус',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(7, 20),
      },
    },
  });

  const pizza_9 = await prisma.product.create({
    data: {
      name: 'Овощи и грибы',
      imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/pizza/ovoshi_i_gribi.png',
      description:
        'Шампиньоны, томаты, сладкий перец, красный лук, кубики брынзы, моцарелла, фирменный томатный соус, итальянские травы',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(3, 14),
      },
    },
  });

  const pizza_10 = await prisma.product.create({
    data: {
      name: 'Гавайская',
      imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/pizza/gavaiskaya.png',
      description: 'Двойная порция цыпленка, ананасы, моцарелла, фирменный соус альфредо',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 18),
      },
    },
  });

  const pizza_11 = await prisma.product.create({
    data: {
      name: 'Четыре сезона',
      imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/pizza/chetire_sezona.png',
      description:
        'Увеличенная порция моцареллы, ветчина, пикантная пепперони, кубики брынзы, томаты, шампиньоны, итальянские травы, фирменный томатный соус',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 12),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // Пицца_1 "Песто"
      generateProductItem({
        productId: pizza_1.id,
        pizzaType: 1,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza_1.id,
        pizzaType: 1,
        pizzaSize: 40,
      }),
      generateProductItem({
        productId: pizza_1.id,
        pizzaType: 2,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza_1.id,
        pizzaType: 2,
        pizzaSize: 40,
      }),

      // Пицца_2 "Сырный цыпленок"
      generateProductItem({
        productId: pizza_2.id,
        pizzaType: 1,
        pizzaSize: 20,
      }),
      generateProductItem({
        productId: pizza_2.id,
        pizzaType: 1,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza_2.id,
        pizzaType: 1,
        pizzaSize: 40,
      }),
      generateProductItem({
        productId: pizza_2.id,
        pizzaType: 2,
        pizzaSize: 20,
      }),
      generateProductItem({
        productId: pizza_2.id,
        pizzaType: 2,
        pizzaSize: 30,
      }),

      // Пицца_3 "Ветчина и грибы"
      generateProductItem({
        productId: pizza_3.id,
        pizzaType: 1,
        pizzaSize: 20,
      }),
      generateProductItem({
        productId: pizza_3.id,
        pizzaType: 1,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza_3.id,
        pizzaType: 1,
        pizzaSize: 40,
      }),

      // Пицца_4 "Чоризо фреш"
      generateProductItem({
        productId: pizza_4.id,
        pizzaType: 1,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza_4.id,
        pizzaType: 1,
        pizzaSize: 40,
      }),
      generateProductItem({
        productId: pizza_4.id,
        pizzaType: 2,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza_4.id,
        pizzaType: 2,
        pizzaSize: 40,
      }),

      // Пицца_5 "Пепперони фреш"
      generateProductItem({
        productId: pizza_5.id,
        pizzaType: 1,
        pizzaSize: 20,
      }),
      generateProductItem({
        productId: pizza_5.id,
        pizzaType: 1,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza_5.id,
        pizzaType: 1,
        pizzaSize: 40,
      }),
      generateProductItem({
        productId: pizza_5.id,
        pizzaType: 2,
        pizzaSize: 20,
      }),
      generateProductItem({
        productId: pizza_5.id,
        pizzaType: 2,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza_5.id,
        pizzaType: 2,
        pizzaSize: 40,
      }),

      // Пицца_6 "Жюльен"
      generateProductItem({
        productId: pizza_6.id,
        pizzaType: 1,
        pizzaSize: 20,
      }),
      generateProductItem({
        productId: pizza_6.id,
        pizzaType: 1,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza_6.id,
        pizzaType: 2,
        pizzaSize: 20,
      }),
      generateProductItem({
        productId: pizza_6.id,
        pizzaType: 2,
        pizzaSize: 30,
      }),

      // Пицца_7 "Сырная"
      generateProductItem({
        productId: pizza_7.id,
        pizzaType: 1,
        pizzaSize: 20,
      }),
      generateProductItem({
        productId: pizza_7.id,
        pizzaType: 1,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza_7.id,
        pizzaType: 1,
        pizzaSize: 40,
      }),
      generateProductItem({
        productId: pizza_7.id,
        pizzaType: 2,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza_7.id,
        pizzaType: 2,
        pizzaSize: 40,
      }),

      // Пицца_8 "Цыпленок барбекю"
      generateProductItem({
        productId: pizza_8.id,
        pizzaType: 1,
        pizzaSize: 20,
      }),
      generateProductItem({
        productId: pizza_8.id,
        pizzaType: 1,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza_8.id,
        pizzaType: 1,
        pizzaSize: 40,
      }),
      generateProductItem({
        productId: pizza_8.id,
        pizzaType: 2,
        pizzaSize: 20,
      }),
      generateProductItem({
        productId: pizza_8.id,
        pizzaType: 2,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza_8.id,
        pizzaType: 2,
        pizzaSize: 40,
      }),

      // Пицца_9 "Овощи и грибы"
      generateProductItem({
        productId: pizza_9.id,
        pizzaType: 1,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza_9.id,
        pizzaType: 1,
        pizzaSize: 40,
      }),
      generateProductItem({
        productId: pizza_9.id,
        pizzaType: 2,
        pizzaSize: 20,
      }),
      generateProductItem({
        productId: pizza_9.id,
        pizzaType: 2,
        pizzaSize: 30,
      }),

      // Пицца_10 "Гавайская"
      generateProductItem({
        productId: pizza_10.id,
        pizzaType: 1,
        pizzaSize: 20,
      }),
      generateProductItem({
        productId: pizza_10.id,
        pizzaType: 1,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza_10.id,
        pizzaType: 1,
        pizzaSize: 40,
      }),
      generateProductItem({
        productId: pizza_10.id,
        pizzaType: 2,
        pizzaSize: 20,
      }),

      // Пицца_11 "Четыре сезона"
      generateProductItem({
        productId: pizza_11.id,
        pizzaType: 1,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza_11.id,
        pizzaType: 1,
        pizzaSize: 40,
      }),
      generateProductItem({
        productId: pizza_11.id,
        pizzaType: 2,
        pizzaSize: 30,
      }),
      generateProductItem({
        productId: pizza_11.id,
        pizzaType: 2,
        pizzaSize: 40,
      }),

      // Остальные продукты
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
      generateProductItem({ productId: 18 }),
      generateProductItem({ productId: 19 }),
      generateProductItem({ productId: 20 }),
      generateProductItem({ productId: 21 }),
      generateProductItem({ productId: 22 }),
      generateProductItem({ productId: 23 }),
      generateProductItem({ productId: 24 }),
      generateProductItem({ productId: 25 }),
      generateProductItem({ productId: 26 }),
      generateProductItem({ productId: 27 }),
      generateProductItem({ productId: 28 }),
      generateProductItem({ productId: 29 }),
      generateProductItem({ productId: 30 }),
      generateProductItem({ productId: 31 }),
      generateProductItem({ productId: 32 }),
      generateProductItem({ productId: 33 }),
      generateProductItem({ productId: 34 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '11111',
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '22222',
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      cartId: 1,
      productItemId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
      },
    ],
  });
}

// функция очищает данные таблиц и обнуляет счетчик id
async function down() {
  // sql запрос TRUNCATE TABLE "User" RESTART IDENTITY CASCADE
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
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

// После очищения и создания фейковых данных отключаем prisma
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
