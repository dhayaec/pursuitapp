export const add = (a: number, b: number) => a + b;

export const reverseArray = (arr: number[]) => arr.reverse();

export const addAll = (...args: number[]) => args.reduce((c, p) => c + p, 0);

export const multiplyAll = (...args: number[]) =>
  args.reduce((c, p) => c * p, 1);
