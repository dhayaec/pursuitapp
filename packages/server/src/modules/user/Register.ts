// import * as bcryptjs from 'bcryptjs';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import errorMessages from '../../i18n/error-messages';
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
    const userAlreadyExists = await User.findOne({
      where: {
        email
      }
    });

    if (userAlreadyExists) {
      throw new Error(errorMessages.emailAlreadyExists);
    }

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
