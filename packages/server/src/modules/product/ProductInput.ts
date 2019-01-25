import { IsNumber, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ProductInput {
  @Field()
  @Length(1, 255)
  title: string;

  @Field()
  @Length(1, 255)
  coverImage: string;

  @Field()
  @IsNumber()
  rating: number;

  @Field()
  description: string;

  @Field()
  @IsNumber()
  price: number;

  @Field()
  @IsNumber()
  offerPrice: number;

  @Field()
  categoryId: string;
}
