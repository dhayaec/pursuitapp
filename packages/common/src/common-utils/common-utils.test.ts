import { add } from '.';

describe('common utils', () => {
  describe('add', () => {
    it('should add two numbers', () => {
      expect(add(1, 2)).toEqual(3);
    });
  });
});
