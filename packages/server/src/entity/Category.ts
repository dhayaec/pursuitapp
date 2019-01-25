import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  Unique,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm';

import { makeSlug } from 'src/utils/utils';
import { Product } from './Product';

@Entity('categories')
@Unique(['slug'])
@Tree('nested-set')
@Index(['parent', 'isBanned'])
@ObjectType()
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column('varchar', { length: 255 })
  name: string;

  @Field()
  @Column('varchar', { length: 255 })
  slug: string;

  @Field(() => [Category])
  @TreeChildren()
  children: Category[];

  @Field(() => Category)
  @TreeParent()
  parent: Category;

  @Column({ default: false })
  isBanned: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @Field(() => [Product])
  @OneToMany(() => Product, product => product.category)
  products: Product[];

  @BeforeInsert()
  async slugify() {
    this.slug = makeSlug(this.name);
  }
}
