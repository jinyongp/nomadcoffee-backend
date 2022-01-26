import bcrypt from 'bcrypt';
import client from '../client';

export default {
  Query: {},
  Mutation: {
    async createUser(_, { username, email, password }) {
      try {
        password = await bcrypt.hash(password, 10);
        const data = { username, email, password };
        await client.user.create({ data });
        return { ok: true };
      } catch ({ code, message }) {
        switch (code) {
          case 'P2002':
            return { ok: false, error: '이미 존재하는 사용자입니다.' };
          default:
            console.error(message, code);
            return { ok: false, error: `Unexpected Server Error (Code: ${code})` };
        }
      }
    },
  },
};
