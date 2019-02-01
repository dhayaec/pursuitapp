import { MiddlewareFn } from 'type-graphql';
import errorMessages from './i18n/error-messages';
import { AppContext } from './types/types';

export const checkIsAdmin: MiddlewareFn<AppContext> = async (
  { context },
  next
) => {
  const { userId, isAdmin } = context.req.session as Express.Session;
  if (!userId) {
    throw new Error(errorMessages.loginToContinue);
  }

  if (!isAdmin) {
    throw new Error(errorMessages.notAuthorized);
  }

  return next();
};

export const checkIsAdminToRegister: MiddlewareFn<AppContext> = async (
  { context, args },
  next
) => {
  const { isAdmin } = context.req.session as Express.Session;

  if (!isAdmin && args.data.isAdmin) {
    throw new Error(errorMessages.notAuthorized);
  }

  return next();
};
