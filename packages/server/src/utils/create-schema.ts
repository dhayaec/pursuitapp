import { buildSchema } from 'type-graphql';
import { CartResolver } from '../modules/cart/CartResolver';
import { CategoryResolver } from '../modules/category/CategoryResolver';
import { ProductResolver } from '../modules/product/ProductResolver';
import { LoginResolver } from '../modules/user/Login';
import { LogoutResolver } from '../modules/user/Logout';
import { RegisterResolver } from '../modules/user/Register';
import { UserAccountUtils } from '../modules/user/UserAccountUtils';
import { UserResolver } from '../modules/user/UserResolver';

export const createSchema = () =>
  buildSchema({
    resolvers: [
      UserResolver,
      RegisterResolver,
      LoginResolver,
      LogoutResolver,
      UserAccountUtils,
      ProductResolver,
      CategoryResolver,
      CartResolver
    ]
  });
