import { Arg, Query, Resolver } from 'type-graphql';
import { Category } from '../../entity/Category';
import { Product } from '../../entity/Product';
import { ITEMS_PER_PAGE } from '../../utils/constants';
import { skipPage } from '../../utils/utils';

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  async listProducts(
    @Arg('page', { defaultValue: 1 }) page: number = 1
  ): Promise<Product[]> {
    return await Product.find({
      skip: skipPage(page),
      take: ITEMS_PER_PAGE,
      relations: ['category']
    });
  }

  @Query(() => Product, { nullable: true })
  async getProduct(@Arg('id') id: string): Promise<Product | undefined> {
    return await Product.findOne(id, { relations: ['category'] });
  }

  @Query(() => [Product])
  async getProductsByCategory(
    @Arg('categoryId') categoryId: string,
    @Arg('page', { defaultValue: 1 }) page: number
  ): Promise<Product[]> {
    const category = Category.findOne(categoryId);
    if (!category) {
      throw new Error('invalid category');
    }

    return await Product.find({
      skip: skipPage(page),
      take: ITEMS_PER_PAGE,
      where: { category },
      relations: ['category']
    });
  }
}
