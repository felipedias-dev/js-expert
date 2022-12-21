const assert = require('assert');

// usado na maioria das vezes para Listas de itens únicos

const arr1 = ['0', '1', '2'];
const arr2 = ['2', '0', '3'];
const arr3 = arr1.concat(arr2);
console.log('arr3:', arr3.sort());
assert.deepStrictEqual(arr3.sort(), [ '0', '0', '1', '2', '2', '3' ]);

const set = new Set();
arr1.map(item => set.add(item));
arr2.map(item => set.add(item));
console.log('set:', set);
assert.deepStrictEqual(Array.from(set), [ '0', '1', '2', '3' ]);
// spread
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [ '0', '1', '2', '3' ]);
// They are the same
console.log('set.keys:', set.keys());
console.log('set.values:', set.values());

// No Array para saber se um item existe
// [].indexOf('1') !== -1 ou [].includes('1')
console.log('set.has(3):', set.has('3'));
assert.ok(set.has('3'));

/* 
  Mesma teoria do Map, mas vc sempre trabalha com a lista toda.
  Não tem 'get', então vc só pode saber se um item está ou não na lista.
  Na doc tem exemplos sobre como fazer uma interseção, diferença de conjuntos, etc...
 */

// Tem nos dois arrays
const user1 = new Set([
  'felipe',
  'renata',
  'valentina'
]);

const user2 = new Set([
  'meire',
  'felipe',
  'geovani'
]);

const intersection = new Set([...user1].filter(user => user2.has(user)));
console.log('intersection:', intersection);
assert.deepStrictEqual(Array.from(intersection), ['felipe']);

const difference = new Set([...user1].filter(user => !user2.has(user)));
console.log('difference:', difference);
assert.deepStrictEqual(Array.from(difference), ['renata', 'valentina']);

// WeakSet
// Mesma coisa do WeakMap
// NÃO é enumerável (iterável)
// Só trabalha com chaves como referência
//  Só tem métodos simples

const user3 = { id: 123 };
const user4 = { id: 321 };
const weakSet = new WeakSet([ user3 ]);

weakSet.add(user4);
weakSet.has(user4);
weakSet.delete(user3);