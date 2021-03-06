import { errorMessages } from '@pursuitapp/common';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Product } from '../../entity/Product';
import { User } from '../../entity/User';
import { AppContext } from '../../types/types';
import { isAuthenticated } from '../../utils/utils';
import { Cart } from './../../entity/Cart';

@Resolver(Cart)
export class CartResolver {
  @Query(() => [Cart])
  async getCart(@Ctx() ctx: AppContext): Promise<Cart[]> {
    const userId = ctx.req.session!.userId;
    if (!userId) {
      return [];
    }

    const user = await User.findOne(userId);
    const cart = await Cart.find({
      where: { user },
      relations: ['product', 'user'],
    });
    return cart;
  }

  @Mutation(() => Cart)
  async addToCart(
    @Ctx() ctx: AppContext,
    @Arg('productId') productId: string,
    @Arg('quantity', { defaultValue: 1 }) quantity: number,
  ): Promise<Cart> {
    const userId = ctx.req.session!.userId;

    isAuthenticated(ctx);

    const product = await Product.findOne(productId);
    const user = await User.findOne(userId);

    if (!product) {
      throw new Error(errorMessages.productNotFound);
    }

    const cart = await Cart.findOne({
      where: {
        product,
        user,
      },
    });

    if (cart) {
      throw new Error(errorMessages.alreadyInCart);
    }

    const c = Cart.create({
      product,
      user,
      title: product.title,
      quantity: quantity,
    });

    const savedCart = await c.save();
    return savedCart;
  }

  @Mutation(() => Boolean)
  async updateCart(
    @Ctx() ctx: AppContext,
    @Arg('cartId') cartId: string,
    @Arg('quantity', { defaultValue: 1 }) quantity: number,
  ): Promise<boolean> {
    isAuthenticated(ctx);

    const cart = await Cart.findOne(cartId);
    if (!cart) {
      throw new Error(errorMessages.itemNotInCart);
    }

    const newQuantity = cart.quantity + quantity;
    await Cart.update(cart.id, { quantity: newQuantity });
    return true;
  }

  @Mutation(() => Boolean)
  async removeFromCart(
    @Ctx() ctx: AppContext,
    @Arg('cartId') cartId: string,
  ): Promise<boolean> {
    isAuthenticated(ctx);

    const cart = await Cart.findOne(cartId);

    if (!cart) {
      throw new Error(errorMessages.itemNotInCart);
    }

    await Cart.delete(cart.id);
    return true;
  }

  @Mutation(() => Boolean)
  async emptyCart(@Ctx() ctx: AppContext): Promise<boolean> {
    const userId = ctx.req.session!.userId;

    isAuthenticated(ctx);

    const user = await User.findOne(userId);
    const cart = await Cart.find({
      where: {
        user,
      },
    });

    if (!cart.length) {
      throw new Error(errorMessages.cartIsEmpty);
    }

    const ids = cart.map(x => x.id);
    await Cart.delete(ids);
    return true;
  }
}
