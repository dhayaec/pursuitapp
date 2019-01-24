import slugify from 'slugify';

export const printMessage = (str: string) => `Hello ${str}`;

export const makeSlug = (str: string) => slugify(str, { lower: true });
