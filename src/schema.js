import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

const loadedTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.(js|ts)`);
const typeDefs = mergeTypeDefs(loadedTypeDefs);

const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.(js|ts)`);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
