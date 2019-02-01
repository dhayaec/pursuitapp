import { UserInputError, ValidationError } from 'apollo-server-core';
import * as IORedis from 'ioredis';
import slugify from 'slugify';
import { v4 } from 'uuid';
import errorMessages from '../i18n/error-messages';
import { ITEMS_PER_PAGE, TokenTypes } from './constants';

export const printMessage = (str: string) => `Hello ${str}`;

export const makeSlug = (str: string) => slugify(str, { lower: true });

export const createTokenLink = async (
  url: string,
  userId: string,
  redis: IORedis.Redis,
  type: TokenTypes
) => {
  const id = v4();
  await redis.set(id, userId, 'ex', 60 * 60 * 24);
  return `${url}/${type}/${id}`;
};

export function skipPage(page: number) {
  return page && page > 0 ? (page - 1) * ITEMS_PER_PAGE : 0;
}

export const formatYupError = (err: ValidationError) => {
  const errors: [{ path: string; message: string }] = [] as any;
  err.inner.forEach((e: any) => {
    errors.push({
      path: e.path,
      message: e.message
    });
  });
  return errors;
};

export const validateInputs = async (schema: any, inputs: any) => {
  try {
    await schema.validate(inputs, { abortEarly: false });
  } catch (err) {
    const errors = formatYupError(err);
    throw new UserInputError(errorMessages.validationFailed, { errors });
  }
};
