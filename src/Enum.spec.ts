import { expect } from 'chai';

import { Enum } from './Enum';

describe('Enum', () => {
  it('should create an enum class', () => {
  });

  describe('toObject', () => {
    it('should convert to an object', () => {
      class MyEnumClass extends Enum<string> {
        VALUE = 'VALUE';
      }

      const MyEnum = new MyEnumClass();

      expect(MyEnum.toObject()).to.eql({ VALUE: 'VALUE' });
    });
  });
});