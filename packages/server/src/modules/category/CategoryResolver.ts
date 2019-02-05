import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { getManager } from 'typeorm';
import { Product } from '../../entity/Product';
import errorMessages from '../../i18n/error-messages';
import { checkIsAdmin } from '../../middlewares';
import { Category } from './../../entity/Category';

@Resolver(Product)
export class CategoryResolver {
  @Query(() => Category, { nullable: true })
  async getCategoryById(@Arg('id') id: string): Promise<Category | undefined> {
    if (!id) {
      return;
    }
    return await Category.findOne(id);
  }

  @Query(() => [Category])
  async getMainCategory(): Promise<Category[]> {
    return await getManager()
      .getTreeRepository(Category)
      .findRoots();
  }

  @Query(() => Category)
  async getChildCategories(@Arg('id') id: string): Promise<Category> {
    const parent = await Category.findOne(id);
    if (!parent) {
      throw new Error(errorMessages.invalidCategory);
    }

    return await getManager()
      .getTreeRepository(Category)
      .findDescendantsTree(parent);
  }

  @Query(() => Category)
  async getBreadCrumbPath(@Arg('id') id: string): Promise<Category> {
    const parent = await Category.findOne(id);
    if (!parent) {
      throw new Error(errorMessages.invalidCategory);
    }

    return await getManager()
      .getTreeRepository(Category)
      .findAncestorsTree(parent);
  }

  @Mutation(() => Category)
  @UseMiddleware(checkIsAdmin)
  async addCategory(
    @Arg('name') name: string,
    @Arg('parentId', { nullable: true }) parentId: string,
  ): Promise<Category> {
    let parent;
    if (parentId) {
      parent = await Category.findOne(parentId);
      if (!parent) {
        throw new Error(errorMessages.invalidParentCategory);
      }
    }

    const c = Category.create({
      name,
      parent,
    });
    return await c.save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(checkIsAdmin)
  async removeCategory(
    @Arg('id', { nullable: true }) id: string,
  ): Promise<boolean> {
    const category = await Category.findOne(id);
    if (!category) {
      return false;
    }
    await Category.remove(category);
    return true;
  }
}
