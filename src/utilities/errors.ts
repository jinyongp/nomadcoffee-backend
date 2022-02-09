import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export const throwNotFoundError = (message: string, code: string) => {
  return () => new PrismaClientKnownRequestError(message, code, Prisma.prismaVersion.client);
};
