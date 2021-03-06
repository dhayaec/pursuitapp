// import * as bcryptjs from 'bcryptjs';
import { userSchema } from '@pursuitapp/common';
import { errorMessages } from '@pursuitapp/common';
import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { User } from '../../entity/User';
import { checkIsAdminToRegister } from '../../middlewares';
import { validateInputs } from '../../utils/utils';
import { RegisterInput } from './register/RegisterInput';

@Resolver(User)
export class RegisterResolver {
  @Mutation(() => User)
  @UseMiddleware(checkIsAdminToRegister)
  async register(@Arg('data')
  {
    email,
    password,
    name,
    mobile,
    isAdmin,
  }: RegisterInput) {
    await validateInputs(userSchema, { email, password, name, mobile });

    const userAlreadyExists = await User.findOne({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error(errorMessages.emailAlreadyExists);
    }

    const user = await User.create({
      name,
      mobile,
      email,
      password,
      isAdmin,
    }).save();
    // await sendEmail()
    return user;
  }
}
