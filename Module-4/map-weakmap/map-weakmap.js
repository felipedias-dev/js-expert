const assert = require('assert');

const myMap = new Map();

// pode ter qualquer coisa como chave
myMap
  .set(1, 'one')
  .set('Felipe', { text: 'seven' })
  .set(true, () => 'hello');

// usando um construtor
const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1']
]);

console.log('myMap:', myMap);
console.log('myMap.get(1):', myMap.get(1));
console.log('myMapWithConstructor:', myMapWithConstructor);

assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Felipe'), { text: 'seven' });
assert.deepStrictEqual(myMap.get(true)(), 'hello');

// Em Objects a chave só pode ser string ou symbol (number sofre coerção para string)
const onlyReferenceWorks = { id: 1 };
myMap.set(onlyReferenceWorks, { name: 'FelipeDias' });

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'FelipeDias' });

// utilitários
// - No Object seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4);

// Para verificar se um item existe no objeto
// item.key = se não existe = undefined
// if () = coerção implícita para boolean e retorna false
// O jeito certo em Object é ({ name: 'Felipe' }).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks));

// Para remover um item do objeto
// delete item.id
// não performático para o JS
assert.ok(myMap.delete(onlyReferenceWorks));

// Não dá pra iterar em Objects diretamente
// tem que transformar com o Object.entries(item)
const myMapStringfied = JSON.stringify([...myMap]);
const expected = JSON.stringify([[1, 'one'], ['Felipe', { text: 'seven' }], [true, () => {}]]);
assert.deepStrictEqual(myMapStringfied, expected);

for (const [key, value] of myMap) {
  console.log({ key, value });
}

// Object é inseguro pois, dependendo do nome da chave, pode substituir algum comportamento padrão
// ({ }).toString() === '[object Object]'
// ({ toString: () => 'Hey' }).toString() === 'Hey'

// Qualquer chave pode colidir com as propriedades do objeto:
// constructor, toString, valueOf, etc...

const actress = {
  name: 'Jenna Ortega',
  toString: 'Wednesday: Jenna Ortega'
};

// Não tem colisão de chave e nem restrição de nome
myMap.set(actress);
console.log('myMap:', myMap);
assert.ok(myMap.has(actress));
assert.throws(() => myMap.get(actress).toString, TypeError);

// Não dá para limpar um Object sem dar um reassign
myMap.clear();
console.log('myMap cleared:', myMap);
assert.deepStrictEqual([...myMap.keys()], []);


//  ---  WeakMap
// Pode ser coletado após perder as referências
// usado em casos bem específicos
// tem a maioria dos benefícios do Map
// MAS: não é iterável
// só chaves de referência e que vc já conheça
// mais leve e previne memory leak, pq depois que as instâncias saem da memória, tudo é limpo

const weakMap = new WeakMap();
const hero = { name: 'Flash' };
weakMap.set(hero);
weakMap.has(hero);
weakMap.get(hero);
weakMap.delete(hero);