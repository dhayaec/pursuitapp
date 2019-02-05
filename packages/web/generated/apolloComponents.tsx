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

export type GetMainCategoryVariables = {};

export type GetMainCategoryQuery = {
  __typename?: 'Query';

  getMainCategory: GetMainCategoryGetMainCategory[];
};

export type GetMainCategoryGetMainCategory = {
  __typename?: 'Category';

  id: string;

  name: string;

  slug: string;
};

export type GetCategoryBySlugVariables = {
  slug: string;
};

export type GetCategoryBySlugQuery = {
  __typename?: 'Query';

  getCategoryBySlug: Maybe<GetCategoryBySlugGetCategoryBySlug>;
};

export type GetCategoryBySlugGetCategoryBySlug = {
  __typename?: 'Category';

  id: string;

  name: string;

  slug: string;
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
export const GetMainCategoryDocument = gql`
  query GetMainCategory {
    getMainCategory {
      id
      name
      slug
    }
  }
`;
export class GetMainCategoryComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetMainCategoryQuery, GetMainCategoryVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetMainCategoryQuery, GetMainCategoryVariables>
        query={GetMainCategoryDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type GetMainCategoryProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetMainCategoryQuery, GetMainCategoryVariables>
> &
  TChildProps;
export function GetMainCategoryHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetMainCategoryQuery,
        GetMainCategoryVariables,
        GetMainCategoryProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    GetMainCategoryQuery,
    GetMainCategoryVariables,
    GetMainCategoryProps<TChildProps>
  >(GetMainCategoryDocument, operationOptions);
}
export const GetCategoryBySlugDocument = gql`
  query GetCategoryBySlug($slug: String!) {
    getCategoryBySlug(slug: $slug) {
      id
      name
      slug
    }
  }
`;
export class GetCategoryBySlugComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetCategoryBySlugQuery, GetCategoryBySlugVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetCategoryBySlugQuery, GetCategoryBySlugVariables>
        query={GetCategoryBySlugDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type GetCategoryBySlugProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetCategoryBySlugQuery, GetCategoryBySlugVariables>
> &
  TChildProps;
export function GetCategoryBySlugHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetCategoryBySlugQuery,
        GetCategoryBySlugVariables,
        GetCategoryBySlugProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    GetCategoryBySlugQuery,
    GetCategoryBySlugVariables,
    GetCategoryBySlugProps<TChildProps>
  >(GetCategoryBySlugDocument, operationOptions);
}
