import { print } from 'graphql/language/printer';
import { Connection } from 'typeorm';
import { connectTestDb } from '../../db';
import {
  getProductQuery,
  getProductsByCategoryQuery,
  listProductsQuery
} from '../../graphql-operations';
import { gqlCall } from './../../utils/test-utils';

let conn: Connection;
beforeAll(async () => {
  conn = await connectTestDb();
});

afterAll(async () => {
  await conn.close();
});

describe('ProductResolver', () => {
  describe('listProducts', () => {
    it('should return list of products', async () => {
      const response = await gqlCall({
        source: print(listProductsQuery)
      });
      expect(response).toMatchObject({
        data: {
          listProducts: []
        }
      });
    });
  });

  describe('getProduct', () => {
    it('should return list of products', async () => {
      const response = await gqlCall({
        source: print(getProductQuery),
        variableValues: {
          id: '123'
        }
      });
      expect(response).toMatchObject({
        data: {
          getProduct: null
        }
      });
    });
  });

  describe('getProductsByCategory', () => {
    it('should return list of products', async () => {
      const response = await gqlCall({
        source: print(getProductsByCategoryQuery),
        variableValues: {
          categoryId: '123'
        }
      });
      expect(response).toMatchObject({
        data: {
          getProductsByCategory: []
        }
      });
    });
  });
});
