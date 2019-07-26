import gql from 'graphql-tag';
import * as React from 'react';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type GCart = {
  __typename?: 'Cart';
  id: Scalars['ID'];
  product: GProduct;
  user: GUser;
  title: Scalars['String'];
  quantity: Scalars['Float'];
  createdAt: Scalars['DateTime'];
};

export type GCategory = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  children?: Maybe<Array<GCategory>>;
  parent?: Maybe<GCategory>;
  createdAt: Scalars['DateTime'];
  products: Array<GProduct>;
};

export type GMutation = {
  __typename?: 'Mutation';
  addToCart: GCart;
  updateCart: Scalars['Boolean'];
  removeFromCart: Scalars['Boolean'];
  emptyCart: Scalars['Boolean'];
  publisherMutation: Scalars['Boolean'];
  addCategory: GCategory;
  removeCategory: Scalars['Boolean'];
  addProduct: GProduct;
  login?: Maybe<GUser>;
  logout: Scalars['Boolean'];
  register: GUser;
  resendVerifySignup: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  verifyForgotPassword?: Maybe<GUser>;
  changePassword: GUser;
  changeEmail: GUser;
};

export type GMutationAddToCartArgs = {
  quantity?: Maybe<Scalars['Float']>;
  productId: Scalars['String'];
};

export type GMutationUpdateCartArgs = {
  quantity?: Maybe<Scalars['Float']>;
  cartId: Scalars['String'];
};

export type GMutationRemoveFromCartArgs = {
  cartId: Scalars['String'];
};

export type GMutationPublisherMutationArgs = {
  message?: Maybe<Scalars['String']>;
};

export type GMutationAddCategoryArgs = {
  parentId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type GMutationRemoveCategoryArgs = {
  id?: Maybe<Scalars['String']>;
};

export type GMutationAddProductArgs = {
  data: GProductInput;
};

export type GMutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type GMutationRegisterArgs = {
  data: GRegisterInput;
};

export type GMutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type GMutationVerifyForgotPasswordArgs = {
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type GMutationChangePasswordArgs = {
  password: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type GMutationChangeEmailArgs = {
  email: Scalars['String'];
};

export type GNotification = {
  __typename?: 'Notification';
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
};

export type GProduct = {
  __typename?: 'Product';
  id: Scalars['ID'];
  title: Scalars['String'];
  slug: Scalars['String'];
  coverImage: Scalars['String'];
  description: Scalars['String'];
  rating: Scalars['Float'];
  offerPrice: Scalars['Float'];
  price: Scalars['Float'];
  yourSavings: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  category: GCategory;
};

export type GProductInput = {
  title: Scalars['String'];
  coverImage: Scalars['String'];
  rating: Scalars['Float'];
  description: Scalars['String'];
  price: Scalars['Float'];
  offerPrice: Scalars['Float'];
  categoryId: Scalars['String'];
};

export type GQuery = {
  __typename?: 'Query';
  getCart: Array<GCart>;
  getCategoryById?: Maybe<GCategory>;
  getCategoryBySlug?: Maybe<GCategory>;
  getMainCategory: Array<GCategory>;
  getChildCategories: GCategory;
  getBreadCrumbPath: GCategory;
  listProducts: Array<GProduct>;
  getProduct?: Maybe<GProduct>;
  getProductsByCategory: Array<GProduct>;
  me?: Maybe<GUser>;
  getUser?: Maybe<GUser>;
  isEmailExists: Scalars['Boolean'];
};

export type GQueryGetCategoryByIdArgs = {
  id: Scalars['String'];
};

export type GQueryGetCategoryBySlugArgs = {
  slug: Scalars['String'];
};

export type GQueryGetChildCategoriesArgs = {
  id: Scalars['String'];
};

export type GQueryGetBreadCrumbPathArgs = {
  id: Scalars['String'];
};

export type GQueryListProductsArgs = {
  page?: Maybe<Scalars['Float']>;
};

export type GQueryGetProductArgs = {
  id: Scalars['String'];
};

export type GQueryGetProductsByCategoryArgs = {
  page?: Maybe<Scalars['Float']>;
  categoryId: Scalars['String'];
};

export type GQueryGetUserArgs = {
  id: Scalars['String'];
};

export type GQueryIsEmailExistsArgs = {
  email: Scalars['String'];
};

export type GRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  mobile?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
};

export type GSubscription = {
  __typename?: 'Subscription';
  normalSubscription: GNotification;
};

export type GUser = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  mobile: Scalars['String'];
  confirmed: Scalars['Boolean'];
  profilePic: Scalars['String'];
  createdAt: Scalars['DateTime'];
};
export type GMainCategoryQueryVariables = {};

export type GMainCategoryQuery = { __typename?: 'Query' } & {
  getMainCategory: Array<
    { __typename?: 'Category' } & Pick<GCategory, 'id' | 'name' | 'slug'>
  >;
};

export type GCategoryBySlugQueryVariables = {
  slug: Scalars['String'];
};

export type GCategoryBySlugQuery = { __typename?: 'Query' } & {
  getCategoryBySlug: Maybe<
    { __typename?: 'Category' } & Pick<GCategory, 'id' | 'name' | 'slug'>
  >;
};

export const MainCategoryDocument = gql`
  query MainCategory {
    getMainCategory {
      id
      name
      slug
    }
  }
`;

export const MainCategoryComponent = (
  props: Omit<
    Urql.QueryProps<GMainCategoryQuery, GMainCategoryQueryVariables>,
    'query'
  > & { variables?: GMainCategoryQueryVariables },
) => <Urql.Query {...props} query={MainCategoryDocument} />;

export function useMainCategoryQuery(
  options: Omit<Urql.UseQueryArgs<GMainCategoryQueryVariables>, 'query'> = {},
) {
  return Urql.useQuery<GMainCategoryQuery>({
    query: MainCategoryDocument,
    ...options,
  });
}
export const CategoryBySlugDocument = gql`
  query CategoryBySlug($slug: String!) {
    getCategoryBySlug(slug: $slug) {
      id
      name
      slug
    }
  }
`;

export const CategoryBySlugComponent = (
  props: Omit<
    Urql.QueryProps<GCategoryBySlugQuery, GCategoryBySlugQueryVariables>,
    'query'
  > & { variables: GCategoryBySlugQueryVariables },
) => <Urql.Query {...props} query={CategoryBySlugDocument} />;

export function useCategoryBySlugQuery(
  options: Omit<Urql.UseQueryArgs<GCategoryBySlugQueryVariables>, 'query'> = {},
) {
  return Urql.useQuery<GCategoryBySlugQuery>({
    query: CategoryBySlugDocument,
    ...options,
  });
}
