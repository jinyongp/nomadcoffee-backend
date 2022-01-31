import bcrypt from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
    async login(_, { username, password }, { client }) {
      const user = await client.user.findFirst({ where: { username } });
      if (!user) return { ok: false, error: 'User Not Found' };

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) return { ok: false, error: 'Wrong Password' };

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
      return { ok: true, token };
    },
  },
};
