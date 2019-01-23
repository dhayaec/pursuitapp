import { printMessage } from './utils';

describe('utils', () => {
  describe('printMessage', () => {
    it('should print hello str', () => {
      expect(printMessage('Mark')).toEqual('Hello Mark');
    });
  });
});
