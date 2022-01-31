import bcrypt from 'bcrypt';
import { createWriteStream } from 'fs';

export default {
  Mutation: {
    async editProfile(_, data, { client, authorizedUser }) {
      if (data.password) data.password = await bcrypt.hash(data.password, 10);
      if (data.avatarURL) {
        const { filename, createReadStream } = await data.avatarURL;
        const readStream = createReadStream();
        const destination = process.cwd() + '/uploads';
        const target = `${authorizedUser.id}_${Date.now()}_${filename}`;
        const path = `${destination}/${target}`;
        const writeStream = createWriteStream(path);
        readStream.pipe(writeStream);
        data.avatarURL = `http://localhost:4000/static/${target}`;
      }
      await client.user.update({ where: { id: authorizedUser.id }, data });
      return { ok: true };
    },
  },
};
