import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload';
import { authorized } from '../users.utils';

type PFileUpload = Promise<FileUpload>;
type EditProfileArgs = Pick<
  User,
  'username' | 'password' | 'email' | 'name' | 'location' | 'githubUsername'
> & { avatarURL: PFileUpload };

export default {
  Mutation: {
    editProfile: authorized(async (_, input: EditProfileArgs, { client, authorizedUser }) => {
      if (input.password) input.password = await bcrypt.hash(input.password, 10);

      let avatarURL: string | undefined;
      if (input.avatarURL) {
        const { filename, createReadStream } = await (input.avatarURL as PFileUpload);
        const readStream = createReadStream();
        const destination = process.cwd() + '/uploads';
        const target = `${authorizedUser.id}_${Date.now()}_${filename}`;
        const path = `${destination}/${target}`;
        const writeStream = createWriteStream(path);
        readStream.pipe(writeStream);
        avatarURL = `http://localhost:4000/static/${target}`;
      }
      await client.user.update({ where: { id: authorizedUser.id }, data: { ...input, avatarURL } });
      return { ok: true };
    }),
  },
};
