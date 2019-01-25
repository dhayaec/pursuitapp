// import * as bcryptjs from 'bcryptjs';
import { Arg, Mutation, Resolver } from 'type-graphql';

import { User } from 'src/entity/User';
import { RegisterInput } from './register/RegisterInput';

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(@Arg('data')
  {
    email,
    password,
    name,
    mobile
  }: RegisterInput) {
    const user = await User.create({
      name,
      mobile,
      email,
      password
    }).save();
    // await sendEmail()
    return user;
  }
}
