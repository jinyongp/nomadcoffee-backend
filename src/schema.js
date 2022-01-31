import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { handleResolverError } from './common/common.utils';

const loadedTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.(js|ts)`);
const typeDefs = mergeTypeDefs(loadedTypeDefs);

const handleResolversError = (resolvers) =>
  resolvers &&
  Object.fromEntries(Object.entries(resolvers).map(([_, res]) => [_, handleResolverError(res)]));

const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.(js|ts)`);
const resolvers = mergeResolvers(
  loadedResolvers.map(({ Query, Mutation, ...rest }) => {
    [Query, Mutation] = [Query, Mutation].map(handleResolversError).map((res) => res || {});
    return { Query, Mutation, ...rest };
  }),
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
