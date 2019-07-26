import { NextPageContext } from 'next';
import Router from 'next/router';

export const addAll = (...args: number[]) => args.reduce((c, p) => c + p, 0);

export const notFoundError = (page: string) => {
  const err: any = new Error(`Cannot find page: ${page}`);
  err.code = 'ENOENT';
  return err;
};

export const redirectTonNonSlash = (ctx: NextPageContext) => {
  if (ctx) {
    const url = ctx.pathname;
    if (url.substr(-1) === '/') {
      const newUrl = url.substr(0, url.length - 1);
      if (ctx.res) {
        ctx.res.writeHead(301, {
          Location: newUrl,
        });
        ctx.res.end();
      } else {
        Router.push(newUrl);
      }
    }
  }
};
