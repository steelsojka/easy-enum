export type EnumConfig = string[] | { [key: string]: ({ value: any }) | string };

export class Enum<T> {
  constructor(config?: EnumConfig) {
    const self = this as any;

    if (Array.isArray(config)) {
      for (const value of config) {
        if (typeof value === 'string') {
          self[value] = value;
        }
      }
    } else if (config != null && typeof config === 'object') {
      for (const key in config) {
        if (config.hasOwnProperty(key)) {
          if (typeof config[key] === 'object' && ('value' in (config[key] as any))) {
            self[key] = (config[key] as any).value;
          } else {
            self[key] = config[key];
          }
        }
      }
    }
  }

  is(value: any): value is T {
    for (let val of this.values()) {
      if (value === val) {
        return true;
      }
    }

    return false;
  }

  has(key: string): boolean {
    return this.hasOwnProperty(key);
  }

  toObject(): { [key: string]: T } {
    return Object.keys(this).reduce((result, key) => ({ [key]: (this as any)[key], ...result }), {});
  }

  freeze(): void {
    Object.freeze(this);
  }

  * values(): IterableIterator<T> {
    for (const [, value ] of this.entries()) {
      yield value;
    }
  }

  * keys(): IterableIterator<string> {
    for (const [ key ] of this.entries()) {
      yield key;
    }
  }

  * entries(): IterableIterator<[ string, T ]> {
    for (const key of Object.keys(this)) {
      yield [ key, (this as any)[key] ];
    }
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }
}