import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => new PrismaClient();

declare global {
  var prismaGoal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGoal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGoal = prisma;
