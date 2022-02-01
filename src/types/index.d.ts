import { PrismaClient, User } from '@prisma/client';
import { GraphQLResolveInfo, GraphQLScalarType } from 'graphql';

type ContextType = {
  readonly client: PrismaClient;
  readonly authorizedUser?: User;
};

type CursorArgs = {
  items: number;
  lastId?: number;
};

type CommonOutput = {
  readonly ok: boolean;
  readonly error?: string;
};

type Resolver = <InputType>(
  parent: any,
  args: InputType,
  context: ContextType,
  info: GraphQLResolveInfo,
) => Promise<CommonOutput>;

type AuthorizedResolver = (
  parent: any,
  args: any,
  context: Required<ContextType>,
  info: GraphQLResolveInfo,
) => Promise<CommonOutput>;

type ComputedResolver<ParentObjectType> = <InputType>(
  parent: ParentObjectType,
  args: InputType,
  context: ContextType,
  info: GraphQLResolveInfo,
) => Promise<any>;

type Resolvers = {
  [key in 'Query' | 'Mutation']?: {
    [key: string]: Resolver;
  };
} & {
  Upload?: GraphQLScalarType;
};

type ComputedFields<ParentObjectType> = {
  [key in string]: {
    [key: string]: ComputedResolver<ParentObjectType>;
  };
};
