import { AppContext } from 'src/types/types';
import { Ctx, Query, Resolver } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: AppContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return;
    }
    return User.findOne(ctx.req.session!.userId);
  }
}
