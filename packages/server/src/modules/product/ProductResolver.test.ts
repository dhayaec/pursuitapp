import { print } from 'graphql/language/printer';
import { Connection } from 'typeorm';
import { connectTestDb } from '../../db';
import {
  addProductMutation,
  getProductQuery,
  getProductsByCategoryQuery,
  listProductsQuery
} from '../../graphql-operations';
import errorMessages from '../../i18n/error-messages';
import { Category } from './../../entity/Category';
import { gqlCall } from './../../utils/test-utils';

let conn: Connection;
let category: Category;
beforeAll(async () => {
  conn = await connectTestDb();
  category = await Category.create({ name: 'Category Name' }).save();
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
          categoryId: category.id.toString()
        }
      });
      expect(response).toMatchObject({
        data: {
          getProductsByCategory: []
        }
      });

      const res = await gqlCall({
        source: print(getProductsByCategoryQuery),
        variableValues: {
          categoryId: '0'
        }
      });
      expect(res).toMatchObject({
        errors: [{ message: errorMessages.invalidCategory }]
      });
      await Category.delete(category);
    });
  });

  describe('addProduct', () => {
    it('should add product', async () => {
      const product = {
        title: 'Product Name',
        coverImage: 'something',
        description: 'something',
        rating: 0,
        price: 99,
        offerPrice: 99,
        categoryId: category.id.toString()
      };

      const response = await gqlCall({
        source: print(addProductMutation),
        variableValues: {
          data: product
        }
      });

      expect(response).toMatchObject({
        data: {
          addProduct: {
            title: product.title,
            price: product.price,
            category: {
              name: category.name
            }
          }
        }
      });

      const invalidProd = { ...product, categoryId: '0' };

      const res = await gqlCall({
        source: print(addProductMutation),
        variableValues: {
          data: invalidProd
        }
      });

      expect(res).toMatchObject({
        data: null
      });
      await Category.delete(category);
    });
  });
});