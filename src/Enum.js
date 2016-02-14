export default class Enum {
  constructor(enums) {
    Object.defineProperties(this, {
      _inverseMap: {
        value: new Map(),
        writable: false,
        configurable: true,
        enumerable: false
      }
    });

    if (Array.isArray(enums)) {
      for (let value of enums) {
        if (typeof value === 'string') {
          this[value] = value;
        }
      }
    } else if (enums != null && typeof enums === 'object') {
      for (let key in enums) {
        if (enums.hasOwnProperty(key)) {
          if ('value' in enums[key]) {
            this[key] = enums[key].value;

            if (enums[key].inverse) {
              this._inverseMap.set(this[key], enums[key.inverse]);
            }
          } else {
            this[key] = enums[key];
          }
        }
      }
    }

    Object.freeze(this);
  }

  is(value) {
    return [...this.values()].indexOf(value) !== -1;
  }

  has(key) {
    return [...this.keys()].indexOf(key) !== -1;
  }

  inverseOf(value) {
    return this._inverseMap.has(value) ? this._inverseMap.get(value) : null;
  }
 
  * values() {
    for (let [key, value] of this.entries()) {
      yield value;
    }
  }

  * keys() {
    for (let [key, value] of this.entries()) {
      yield key;
    }
  }

  * entries() {
    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        yield [key, this[key]];
      }
    }
  }

  [Symbol.iterator]() {
    return this.values();
  }
}
