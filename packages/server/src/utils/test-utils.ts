import { graphql, GraphQLSchema } from 'graphql';
import Maybe from 'graphql/tsutils/Maybe';
import { formatArgumentValidationError } from 'type-graphql';
import { createSchema } from './create-schema';

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  userId?: number;
}

let schema: GraphQLSchema;

export const gqlCall = async ({
  source,
  variableValues,
  userId = 0
}: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  const { errors, data } = await graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId
        }
      },
      res: {
        clearCookie: jest.fn()
      }
    }
  });

  const e = errors && errors.map(formatArgumentValidationError);
  return {
    data,
    errors: e
  };
};
