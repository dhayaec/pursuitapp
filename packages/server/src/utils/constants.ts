import { createError } from 'apollo-errors';
import errorMessages from '../i18n/error-messages';

export enum Env {
  development = 'development',
  test = 'test',
  production = 'production'
}

export enum TokenTypes {
  confirm = 'confirm',
  reset = 'reset'
}

export const ITEMS_PER_PAGE = 20;

export const InputValidationError = createError('InputValidationError', {
  message: errorMessages.validationFailed
});
