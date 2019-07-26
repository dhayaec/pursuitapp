export const addAll = (...args: number[]) => args.reduce((c, p) => c + p, 0);

export const notFoundError = (page: string) => {
  const err: any = new Error(`Cannot find page: ${page}`);
  err.code = 'ENOENT';
  return err;
};
