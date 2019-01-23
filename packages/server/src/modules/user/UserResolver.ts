import { Query, Resolver } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me() {
    return User.findOne({ id: 'something' });
  }
}
