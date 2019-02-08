export type Maybe<T> = T | null;

export interface ProductInput {
  title: string;

  coverImage: string;

  rating: number;

  description: string;

  price: number;

  offerPrice: number;

  categoryId: string;
}

export interface RegisterInput {
  email: string;

  password: string;

  name: string;

  mobile?: Maybe<string>;

  isAdmin?: Maybe<boolean>;
}

/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = any;

// ====================================================
// Documents
// ====================================================

export type RegisterVariables = {
  data: RegisterInput;
};

export type RegisterMutation = {
  __typename?: 'Mutation';

  register: RegisterRegister;
};

export type RegisterRegister = {
  __typename?: 'User';

  id: string;

  email: string;

  name: string;

  mobile: string;
};

export type LoginVariables = {
  email: string;
  password: string;
};

export type LoginMutation = {
  __typename?: 'Mutation';

  login: Maybe<LoginLogin>;
};

export type LoginLogin = {
  __typename?: 'User';

  id: string;

  email: string;

  name: string;
};

export type MainCategoryVariables = {};

export type MainCategoryQuery = {
  __typename?: 'Query';

  getMainCategory: MainCategoryGetMainCategory[];
};

export type MainCategoryGetMainCategory = {
  __typename?: 'Category';

  id: string;

  name: string;

  slug: string;
};

export type CategoryBySlugVariables = {
  slug: string;
};

export type CategoryBySlugQuery = {
  __typename?: 'Query';

  getCategoryBySlug: Maybe<CategoryBySlugGetCategoryBySlug>;
};

export type CategoryBySlugGetCategoryBySlug = {
  __typename?: 'Category';

  id: string;

  name: string;

  slug: string;
};

export type ProductsByCategoryVariables = {
  categoryId: string;
};

export type ProductsByCategoryQuery = {
  __typename?: 'Query';

  getProductsByCategory: ProductsByCategoryGetProductsByCategory[];
};

export type ProductsByCategoryGetProductsByCategory = {
  __typename?: 'Product';

  id: string;

  title: string;

  description: string;

  price: number;

  offerPrice: number;
};

export type NewNotificationVariables = {};

export type NewNotificationSubscription = {
  __typename?: 'Subscription';

  newNotification: NewNotificationNewNotification;
};

export type NewNotificationNewNotification = {
  __typename?: 'Notification';

  id: string;

  message: Maybe<string>;
};

import * as ReactApollo from 'react-apollo';
import * as React from 'react';

import gql from 'graphql-tag';

// ====================================================
// Components
// ====================================================

export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      id
      email
      name
      mobile
    }
  }
`;
export class RegisterComponent extends React.Component<
  Partial<ReactApollo.MutationProps<RegisterMutation, RegisterVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<RegisterMutation, RegisterVariables>
        mutation={RegisterDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type RegisterProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<RegisterMutation, RegisterVariables>
> &
  TChildProps;
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterVariables
>;
export function RegisterHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RegisterMutation,
        RegisterVariables,
        RegisterProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    RegisterMutation,
    RegisterVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, operationOptions);
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;
export class LoginComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LoginMutation, LoginVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LoginMutation, LoginVariables>
        mutation={LoginDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type LoginProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginVariables>
> &
  TChildProps;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginVariables
>;
export function LoginHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LoginMutation,
        LoginVariables,
        LoginProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    LoginMutation,
    LoginVariables,
    LoginProps<TChildProps>
  >(LoginDocument, operationOptions);
}
export const MainCategoryDocument = gql`
  query MainCategory {
    getMainCategory {
      id
      name
      slug
    }
  }
`;
export class MainCategoryComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MainCategoryQuery, MainCategoryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MainCategoryQuery, MainCategoryVariables>
        query={MainCategoryDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type MainCategoryProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MainCategoryQuery, MainCategoryVariables>
> &
  TChildProps;
export function MainCategoryHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MainCategoryQuery,
        MainCategoryVariables,
        MainCategoryProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    MainCategoryQuery,
    MainCategoryVariables,
    MainCategoryProps<TChildProps>
  >(MainCategoryDocument, operationOptions);
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
export class CategoryBySlugComponent extends React.Component<
  Partial<ReactApollo.QueryProps<CategoryBySlugQuery, CategoryBySlugVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<CategoryBySlugQuery, CategoryBySlugVariables>
        query={CategoryBySlugDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type CategoryBySlugProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<CategoryBySlugQuery, CategoryBySlugVariables>
> &
  TChildProps;
export function CategoryBySlugHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CategoryBySlugQuery,
        CategoryBySlugVariables,
        CategoryBySlugProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    CategoryBySlugQuery,
    CategoryBySlugVariables,
    CategoryBySlugProps<TChildProps>
  >(CategoryBySlugDocument, operationOptions);
}
export const ProductsByCategoryDocument = gql`
  query ProductsByCategory($categoryId: String!) {
    getProductsByCategory(categoryId: $categoryId) {
      id
      title
      description
      price
      offerPrice
    }
  }
`;
export class ProductsByCategoryComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<ProductsByCategoryQuery, ProductsByCategoryVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<ProductsByCategoryQuery, ProductsByCategoryVariables>
        query={ProductsByCategoryDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type ProductsByCategoryProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<ProductsByCategoryQuery, ProductsByCategoryVariables>
> &
  TChildProps;
export function ProductsByCategoryHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ProductsByCategoryQuery,
        ProductsByCategoryVariables,
        ProductsByCategoryProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    ProductsByCategoryQuery,
    ProductsByCategoryVariables,
    ProductsByCategoryProps<TChildProps>
  >(ProductsByCategoryDocument, operationOptions);
}
export const NewNotificationDocument = gql`
  subscription NewNotification {
    newNotification {
      id
      message
    }
  }
`;
export class NewNotificationComponent extends React.Component<
  Partial<
    ReactApollo.SubscriptionProps<
      NewNotificationSubscription,
      NewNotificationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Subscription<
        NewNotificationSubscription,
        NewNotificationVariables
      >
        subscription={NewNotificationDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type NewNotificationProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<NewNotificationSubscription, NewNotificationVariables>
> &
  TChildProps;
export function NewNotificationHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        NewNotificationSubscription,
        NewNotificationVariables,
        NewNotificationProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    NewNotificationSubscription,
    NewNotificationVariables,
    NewNotificationProps<TChildProps>
  >(NewNotificationDocument, operationOptions);
}
