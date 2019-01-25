import * as IORedis from 'ioredis';
import slugify from 'slugify';
import { v4 } from 'uuid';
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
