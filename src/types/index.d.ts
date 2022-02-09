import { PrismaClient, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { GraphQLResolveInfo, GraphQLScalarType } from 'graphql';

type SendError = () => PrismaClientKnownRequestError;
type PrismaClientOptions = {
  rejectOnNotFound: {
    [api in 'findFirst' | 'findUnique']: {
      [model in 'User' | 'CoffeeShop' | 'CoffeeShopPhoto']: SendError;
    };
  };
};

type ContextType = {
  readonly client: PrismaClient<PrismaClientOptions>;
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

type Resolver = (
  parent: any,
  args: any,
  context: ContextType,
  info: GraphQLResolveInfo,
) => Promise<any>;

type AuthorizedResolver<ParentObjectType = any> = (
  parent: ParentObjectType,
  args: any,
  context: Required<ContextType>,
  info: GraphQLResolveInfo,
) => Promise<any>;

type ComputedField<ParentObjectType> = (
  parent: ParentObjectType,
  args: any,
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
  [schema: string]: {
    [field: string]: ComputedField<ParentObjectType>;
  };
};
