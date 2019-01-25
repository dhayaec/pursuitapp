import { User } from 'src/entity/User';
import { AppContext } from 'src/types/types';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: AppContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return;
    }
    return User.findOne(ctx.req.session!.userId);
  }

  @Query(() => User, { nullable: true })
  async getUser(@Arg('id') id: string): Promise<User | undefined> {
    if (!id) {
      return;
    }
    return await User.findOne(id);
  }
}
