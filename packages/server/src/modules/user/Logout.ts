import { Ctx, Mutation, Resolver } from 'type-graphql';
import { AppContext } from '../../types/types';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: AppContext): Promise<boolean> {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy(err => {
        if (err) {
          console.log(err);
          return rej(false);
        }

        ctx.res.clearCookie('qid');
        return res(true);
      })
    );
  }
}
