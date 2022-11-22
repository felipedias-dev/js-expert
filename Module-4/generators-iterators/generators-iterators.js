const assert = require('assert');

function* calcutation(arg1, arg2) {
  yield arg1 * arg2;
}

function* main() {
  yield 'Hello';
  yield '-';
  yield 'World';
  yield* calcutation(20, 10);
}

const generator = main();

// (async () => {
//   for await (const data of generator) {
//     console.log(data);
//   }
// })()

// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false });
assert.deepStrictEqual(generator.next(), { value: '-', done: false });
assert.deepStrictEqual(generator.next(), { value: 'World', done: false });
assert.deepStrictEqual(generator.next(), { value: 200, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

assert.deepStrictEqual(Array.from(main()), ['Hello', '-', 'World', 200]);
assert.deepStrictEqual([...main()], ['Hello', '-', 'World', 200]);