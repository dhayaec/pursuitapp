import { reverseStr } from './web-utils';

describe('web-utils', () => {
  describe('reverse', () => {
    it('should reverse str', () => {
      expect(reverseStr('abc')).toEqual('cba');
    });
  });
});
