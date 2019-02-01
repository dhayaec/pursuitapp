import * as bcryptjs from 'bcryptjs';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { AppContext } from '../../types/types';

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: AppContext
  ): Promise<User | undefined> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return;
    }

    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) {
      return;
    }

    ctx.req.session!.userId = user.id;
    ctx.req.session!.name = user.name;
    ctx.req.session!.email = user.email;
    ctx.req.session!.isAdmin = user.isAdmin;

    return user;
  }
}
