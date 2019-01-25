import * as bcryptjs from 'bcryptjs';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { redis } from '../../redis';
import { AppContext } from '../../types/types';
import { TokenTypes } from '../../utils/constants';
import { createTokenLink } from '../../utils/utils';

@Resolver()
export class UserAccountUtils {
  @Mutation(() => Boolean)
  async resendVerifySignup(@Ctx() ctx: AppContext): Promise<boolean> {
    const userId = ctx.req.session!.userId;
    if (!userId) {
      return false;
    }
    const url = process.env.FRONTEND_HOST as string;
    const confirmLink = await createTokenLink(
      url,
      userId,
      redis,
      TokenTypes.confirm
    );
    console.log(confirmLink);
    // TODO send confirmLink email
    return true;
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<boolean> {
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return false;
    }

    const { id: userId } = user;
    const url = process.env.FRONTEND_HOST as string;
    const resetLink = await createTokenLink(
      url,
      userId,
      redis,
      TokenTypes.reset
    );

    console.log(resetLink);
    return true;
  }

  @Mutation(() => User)
  async verifyForgotPassword(
    @Arg('token') token: string,
    @Arg('password') password: string,
    @Arg('confirmPassword') confirmPassword: string
  ) {
    if (password !== confirmPassword) {
      throw new Error('passwords dont match');
    }

    const userId = await redis.get(token);
    if (!userId) {
      throw new Error('invalid token');
    }

    await redis.del(token);

    const user = await User.findOne(userId);
    if (!user) {
      throw new Error('user not found');
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    await User.update(userId, { password: hashedPassword });
    // TODO send an alert email
    return user;
  }

  @Mutation(() => User)
  async changePassword(
    @Ctx() ctx: AppContext,
    @Arg('oldPassword') oldPassword: string,
    @Arg('newPassword') password: string
  ) {
    const userId = ctx.req.session!.userId;
    if (!userId) {
      return false;
    }

    const user = await User.findOne(userId);
    if (!user) {
      throw new Error('user not found');
    }

    const valid = await bcryptjs.compare(oldPassword, user.password);
    if (!valid) {
      throw new Error('Invalid old password');
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    await User.update(userId, { password: hashedPassword });
    // TODO send an alert email
    return user;
  }

  @Mutation(() => User)
  async changeEmail(@Ctx() ctx: AppContext, @Arg('email') email: string) {
    const userId = ctx.req.session!.userId;
    if (!userId) {
      throw new Error('Login first');
    }

    const user = await User.findOne(userId);
    if (!user) {
      throw new Error('user not found');
    }

    if (user.email === email) {
      throw new Error('New email is same as old one');
    }

    await User.update(userId, { email });

    const newUser = await User.findOne(userId);

    // TODO send an alert email
    return newUser;
  }
}
