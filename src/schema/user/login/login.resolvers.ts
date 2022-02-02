import { User } from '@prisma/client';
import { Resolvers } from '@types';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

type LoginArgs = Pick<User, 'username' | 'password'>;

export default {
  Mutation: {
    login: async (_, { username, password }: LoginArgs, { client }) => {
      const user = await client.user.findFirst({ where: { username } });
      if (!user) return { ok: false, error: 'User Not Found' };

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) return { ok: false, error: 'Wrong Password' };

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY as jwt.Secret);
      return { ok: true, token };
    },
  },
} as Resolvers;
