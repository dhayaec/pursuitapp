import { add, reverseArray, addAll, multiplyAll } from './common-utils';

describe('common utils', () => {
  describe('add', () => {
    it('should add two numbers', () => {
      expect(add(1, 2)).toEqual(3);
    });
  });
  describe('reverseArray', () => {
    it('should reverse given array', () => {
      expect(reverseArray([1, 2])).toEqual([2, 1]);
    });
  });
  describe('allAll', () => {
    it('add all params', () => {
      expect(addAll(1, 2, 3)).toEqual(6);
    });
  });
  describe('multiplyAll', () => {
    it('multiple all params', () => {
      expect(multiplyAll(1, 2, 3, 4)).toEqual(24);
    });
  });
});
