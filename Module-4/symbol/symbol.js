const assert = require('assert');

// --- keys
const uniqueKey = Symbol('username');
const user = {};

user['username'] = 'value for normal objects';
user[uniqueKey] = 'value for symbol';

console.log('getting normal objects:', user.username);
console.log('getting symbol objects:', user[uniqueKey]);
// Sempre único em nível de endereço de memória
console.log('getting symbol objects the wrong way:', user[Symbol('username')]);
console.log('properties', Object.getOwnPropertyNames(user));
console.log('symbols', Object.getOwnPropertySymbols(user)[0]);

assert.deepStrictEqual(user.username, 'value for normal objects');
assert.deepStrictEqual(user[uniqueKey], 'value for symbol');
assert.deepStrictEqual(user[Symbol('username')], undefined);
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);
// Bypass - má prática (nem tem no codebase do Node)
user[Symbol.for('password')] = 123;
assert.deepStrictEqual(user[Symbol.for('password')], 123);
// --- keys

// Well known Symbols
const obj = {
  // iterators
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop()
      }
    }
  })
};

console.log('ArrayFrom:', Array.from(obj));

for (const item of obj) {
  console.log('item:', item);
}

assert.deepStrictEqual([...obj], [ 'a', 'b', 'c' ]);

const kItems = Symbol('kItems');

class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg));
  }

  get [Symbol.toStringTag]() {
    return 'MyDate'
  }

  [Symbol.toPrimitive](coertionType) {
    if (coertionType !== 'string') throw new TypeError();

    const items = this[kItems]
                    .map(item => 
                          new Intl
                            .DateTimeFormat('pt-BR', { month: 'long', day: '2-digit', year: 'numeric' })
                            .format(item)
                    );

    return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(items);
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeOut = ms => new Promise(r => setTimeout(r, ms));

    for (const item of this[kItems]) {
      await (timeOut(2000));
      yield item.toISOString();
    }
  }
}

const myDate = new MyDate(
  [2020, 03, 01],
  [2018, 02, 02]
);

console.log('myDate:', myDate);
console.log('myDate.toString():', Object.prototype.toString.call(myDate));
console.log('String(myDate):', String(myDate));
console.log('[...myDate]', [...myDate]);

const expectedDates = [
  new Date(2020, 03, 01),
  new Date(2018, 02, 02)
]

assert.deepStrictEqual(myDate[kItems], expectedDates);
assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object MyDate]');
assert.throws(() => myDate + 1, TypeError);

// Coerção explícita para chamar o toPrimitive
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018');

// implementar o iterator
assert.deepStrictEqual([...myDate], expectedDates);

( async () => {
  for await (const item of myDate) {
    console.log('asyncIterator:', item);
  }
})();

( async () => {
  const dates = [];
  const expectedDatesISOString = expectedDates.map(item => item.toISOString());

  for await (const item of myDate) {
    dates.push(item)
  }

  assert.deepStrictEqual(dates, expectedDatesISOString);
})();