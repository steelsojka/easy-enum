easy-enum
=========

Enums so easy...

Install
-------

`npm install --save easy-enum`

Usage
-----

```javascript
import Enum from 'easy-enum';

let Status = new Enum([
  'INCOMPLETE',
  'COMPLETE'
]);

Status.COMPLETE === 'COMPLETE'; // => true
typeof Status.COMPLETE === 'string'; // => true

// Don't need to serialize it? Use Symbols!
// You can use any value you want.

Status = new Enum({
  INCOMPLETE: Symbol(),
  COMPLETE: Symbol()
});

//Enums are immutable
Status.COMPLETE = 123; // => NOPE!
```

API
---

```javascript
let Status = new Enum({
  INCOMPLETE: Symbol(),
  COMPLETE: Symbol()
});

// Whether a key exists
Status.has('COMPLETE'); // => true
Status.has('BLORG'); // => false

// Whether a value is an enum value
Status.is(Status.COMPLETE); // => true
Status.is('COMPLETE'); // => false

// Enums are iterable
for (let status of Status) {
  Status.is(status); // => true
}

Status.keys(); // Iterate over enum keys
Status.entries(); // Iterate over [key, value]
Status.values(); // Iterate over enum values
```
