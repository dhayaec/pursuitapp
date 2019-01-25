import * as bcryptjs from 'bcryptjs';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
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
    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = await User.create({
      name,
      mobile,
      email,
      password: hashedPassword
    }).save();
    // await sendEmail()
    return user;
  }
}
