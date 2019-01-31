import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 255)
  @IsEmail()
  email: string;

  @Field()
  password: string;

  @Field()
  @Length(3, 100)
  name: string;

  @Field({ nullable: true })
  @Length(10)
  mobile: string;
}
