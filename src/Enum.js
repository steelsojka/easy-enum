export default class Enum {
  constructor(enums) {
    Object.defineProperty(this, '__keys', { value: [] });

    if (Array.isArray(enums)) {
      for (let value of enums) {
        if (typeof value === 'string') {
          this.__keys.push(value);
          this[value] = value;
        }
      }
    } else if (enums != null && typeof enums === 'object') {
      for (let key in enums) {
        if (enums.hasOwnProperty(key)) {
          if (typeof enums[key] === 'object' && ('value' in enums[key])) {
            this[key] = enums[key].value;
          } else {
            this[key] = enums[key];
          }

          this.__keys.push(key);
        }
      }
    }

    Object.freeze(this);
  }

  is(value) {
    for (let val of this.values()) {
      if (value === val) {
        return true;
      }
    }

    return false;
  }

  has(key) {
    return this.__keys.indexOf(key) !== -1;
  }

  toObject() {
    let result = {};

    for (let key of this.__keys) {
      result[key] = this[key];
    }

    return result;
  }
 
  * values() {
    for (let [, value] of this.entries()) {
      yield value;
    }
  }

  * keys() {
    for (let [key] of this.entries()) {
      yield key;
    }
  }

  * entries() {
    for (let key of this.__keys) {
      yield [key, this[key]];
    }
  }

  [Symbol.iterator]() {
    return this.values();
  }
}
