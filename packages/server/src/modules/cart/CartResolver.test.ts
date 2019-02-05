import { print } from 'graphql/language/printer';
import { Connection } from 'typeorm';
import { connectTestDb } from '../../db';
import { Product } from '../../entity/Product';
import { User } from '../../entity/User';
import {
  addToCartMutation,
  emptyCartMutation,
  getCartQuery,
  removeFromCartMutation,
} from '../../graphql-operations';
import errorMessages from '../../i18n/error-messages';
import { gqlCall } from '../../utils/test-utils';
import { Category } from './../../entity/Category';

let conn: Connection;
beforeAll(async () => {
  conn = await connectTestDb();
});

afterAll(async () => {
  await conn.close();
});

describe('CartResolver', () => {
  describe('getCart', () => {
    it('should getCart', async () => {
      const response = await gqlCall({
        source: print(getCartQuery),
      });
      expect(response).toMatchObject({
        data: {
          getCart: [],
        },
      });
    });
  });
  let user: User;
  let product: Product;
  let category: Category;
  describe('addToCart', () => {
    beforeAll(async () => {
      user = await User.create({
        name: 'testing',
        email: 'testing-cart@gmail.com',
        password: '123456',
      }).save();

      category = await Category.create({
        name: 'Some Category',
      }).save();

      product = await Product.create({
        title: 'example product',
        coverImage: 'some',
        rating: 0,
        description: 'something',
        price: 99,
        offerPrice: 100,
        category,
      }).save();
    });

    afterAll(async () => {
      await Product.remove(product);
    });

    it('should addToCart', async () => {
      const response = await gqlCall({
        source: print(addToCartMutation),
        variableValues: {
          productId: product.id,
        },
        userId: user.id,
      });
      expect(response).toMatchObject({
        data: {
          addToCart: {
            title: product.title,
          },
        },
      });

      const res1 = await gqlCall({
        source: print(addToCartMutation),
        variableValues: {
          productId: product.id,
        },
        userId: '',
      });
      expect(res1).toMatchObject({
        errors: [{ message: errorMessages.loginToContinue }],
      });

      const res2 = await gqlCall({
        source: print(addToCartMutation),
        variableValues: {
          productId: '0',
        },
        userId: user.id,
      });
      expect(res2).toMatchObject({
        errors: [{ message: errorMessages.productNotFound }],
      });

      const res3 = await gqlCall({
        source: print(addToCartMutation),
        variableValues: {
          productId: product.id,
        },
        userId: user.id,
      });
      expect(res3).toMatchObject({
        errors: [{ message: errorMessages.alreadyInCart }],
      });
    });

    it('should getCart with items', async () => {
      const response = await gqlCall({
        source: print(getCartQuery),
        userId: user.id,
      });
      expect(response).toMatchObject({
        data: {
          getCart: [
            {
              title: product.title,
              product: {
                title: product.title,
              },
              user: {
                name: user.name,
              },
            },
          ],
        },
      });
    });

    it('should removeFromCart', async () => {
      const response = await gqlCall({
        source: print(removeFromCartMutation),
        variableValues: {
          productId: product.id,
        },
        userId: user.id,
      });
      expect(response).toMatchObject({
        data: {
          removeFromCart: true,
        },
      });

      const res = await gqlCall({
        source: print(removeFromCartMutation),
        variableValues: {
          productId: product.id,
        },
        userId: '',
      });
      expect(res).toMatchObject({
        errors: [{ message: errorMessages.loginToContinue }],
      });

      const res1 = await gqlCall({
        source: print(removeFromCartMutation),
        variableValues: {
          productId: '0',
        },
        userId: user.id,
      });
      expect(res1).toMatchObject({
        errors: [{ message: errorMessages.productNotFound }],
      });

      const res2 = await gqlCall({
        source: print(removeFromCartMutation),
        variableValues: {
          productId: product.id,
        },
        userId: user.id,
      });
      expect(res2).toMatchObject({
        errors: [{ message: errorMessages.itemNotInCart }],
      });
    });
    it('should emptyCart', async () => {
      const response = await gqlCall({
        source: print(emptyCartMutation),
        userId: user.id,
      });
      expect(response).toMatchObject({
        errors: [{ message: errorMessages.cartIsEmpty }],
      });
      const res = await gqlCall({
        source: print(emptyCartMutation),
        userId: '',
      });
      expect(res).toMatchObject({
        errors: [{ message: errorMessages.loginToContinue }],
      });
      await gqlCall({
        source: print(addToCartMutation),
        variableValues: {
          productId: product.id,
        },
        userId: user.id,
      });
      const res1 = await gqlCall({
        source: print(emptyCartMutation),
        userId: user.id,
      });
      expect(res1).toMatchObject({
        data: {
          emptyCart: true,
        },
      });
    });
  });
});
