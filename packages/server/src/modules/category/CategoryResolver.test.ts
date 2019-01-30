import { print } from 'graphql/language/printer';
import { Connection, getManager } from 'typeorm';
import { connectTestDb } from '../../db';
import {
  addCategoryMutation,
  getBreadCrumbPathQuery,
  getCategoryByIdQuery,
  getChildCategoriesQuery
} from '../../graphql-operations';
import { Category } from './../../entity/Category';
import { getMainCategoryQuery } from './../../graphql-operations';
import { gqlCall } from './../../utils/test-utils';

let conn: Connection;
let a1: Category;
let a12: Category;
beforeAll(async () => {
  conn = await connectTestDb();
  const manager = getManager();

  a1 = new Category();
  a1.name = 'a1';
  await manager.save(a1);

  const a11 = new Category();
  a11.name = 'a11';
  a11.parent = a1;
  await manager.save(a11);

  a12 = new Category();
  a12.name = 'a12';
  a12.parent = a1;
  await manager.save(a12);

  const a111 = new Category();
  a111.name = 'a111';
  a111.parent = a11;
  await manager.save(a111);

  const a112 = new Category();
  a112.name = 'a112';
  a112.parent = a11;
  await manager.save(a112);
});

afterAll(async () => {
  await conn.close();
});

describe('CategoryResolver', () => {
  describe('getCategoryById', () => {
    it('should return category', async () => {
      const response = await gqlCall({
        source: print(getCategoryByIdQuery),
        variableValues: {
          id: a1.id.toString()
        }
      });
      expect(response).toMatchObject({
        data: {
          getCategoryById: {
            id: a1.id.toString(),
            name: a1.name
          }
        }
      });
    });
  });
  describe('addCategory', () => {
    it('should add category', async () => {
      const response = await gqlCall({
        source: print(addCategoryMutation),
        variableValues: {
          name: 'a2'
        }
      });
      expect(response).toMatchObject({
        data: {
          addCategory: {
            name: 'a2'
          }
        }
      });
    });
  });
  describe('getMainCategory', () => {
    it('should return main category', async () => {
      const response: any = await gqlCall({
        source: print(getMainCategoryQuery)
      });
      const {
        data: { getMainCategory }
      } = response;

      expect(getMainCategory).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'a1'
          })
        ])
      );
    });
  });
  describe('getChildCategories', () => {
    it('should return main category', async () => {
      const response = await gqlCall({
        source: print(getChildCategoriesQuery),
        variableValues: {
          id: a1.id.toString()
        }
      });

      expect(response).toMatchObject({
        data: {
          getChildCategories: {
            name: 'a1',
            children: [
              {
                name: 'a11'
              },
              {
                name: 'a12'
              }
            ]
          }
        }
      });
    });
  });
  describe('getBreadCrumbPath', () => {
    it('should return main category', async () => {
      const response = await gqlCall({
        source: print(getBreadCrumbPathQuery),
        variableValues: {
          id: a12.id.toString()
        }
      });

      expect(response).toMatchObject({
        data: {
          getBreadCrumbPath: {
            name: 'a12',
            parent: {
              name: 'a1'
            }
          }
        }
      });
    });
  });
});
