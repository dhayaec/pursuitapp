import { productSchema } from '@pursuitapp/common';
import { errorMessages } from '@pursuitapp/common';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Category } from '../../entity/Category';
import { Product } from '../../entity/Product';
import { ITEMS_PER_PAGE } from '../../utils/constants';
import { skipPage, validateInputs } from '../../utils/utils';
import { ProductInput } from './ProductInput';

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  async listProducts(
    @Arg('page', { defaultValue: 1 }) page: number,
  ): Promise<Product[]> {
    const products = await Product.find({
      skip: skipPage(page),
      take: ITEMS_PER_PAGE,
      relations: ['category'],
    });
    return products;
  }

  @Query(() => Product, { nullable: true })
  async getProduct(@Arg('id') id: string): Promise<Product | undefined> {
    if (!id) {
      return;
    }
    const product = await Product.findOne(id, { relations: ['category'] });
    return product;
  }

  @Query(() => [Product])
  async getProductsByCategory(
    @Arg('categoryId') categoryId: string,
    @Arg('page', { defaultValue: 1 }) page: number,
  ): Promise<Product[]> {
    const category = await Category.findOne(categoryId);
    if (!category) {
      throw new Error(errorMessages.invalidCategory);
    }

    const products = await Product.find({
      skip: skipPage(page),
      take: ITEMS_PER_PAGE,
      where: { category },
      relations: ['category'],
    });
    return products;
  }

  @Mutation(() => Product)
  async addProduct(@Arg('data')
  {
    title,
    coverImage,
    description,
    rating,
    price,
    offerPrice,
    categoryId,
  }: ProductInput): Promise<Product> {
    await validateInputs(productSchema, {
      title,
      coverImage,
      description,
      rating,
      price,
      offerPrice,
    });

    const category = await Category.findOne(categoryId);

    if (!category) {
      throw new Error(errorMessages.invalidCategory);
    }

    const c = Product.create({
      title,
      coverImage,
      rating,
      description,
      price,
      offerPrice,
      category,
    });

    const savedProduct = await c.save();
    return savedProduct;
  }
}
