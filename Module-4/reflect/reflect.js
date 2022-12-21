'use strict'

const assert = require('assert');

// garantir semântica e segurança em objetos

//  -----  apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  }
};

// um problema que pode acontecer (raro) - descomentar abaixo para testar
// Function.prototype.apply = () => { throw new TypeError('Eitah!')};

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

// Esse aqui pode aconter!
myObj.add.apply = function () { throw new TypeError('Vixee!')};

assert.throws(
  () => myObj.add.apply({}, []),
  {
    name: 'TypeError',
    message: 'Vixee!'
  }
);

// usando reflect

// - apply
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);

// - defineProperty
// --- questões semânticas
function Mydate() {};

// Feio pra kct, tudo é Object, mas Object adicionando prop para uma function?
Object.defineProperty(Mydate, 'withObject', { value: () => 'Object here!'});

// Agora faz mais sentido
Reflect.defineProperty(Mydate, 'withReflect', { value: () => 'Reflect here!'});

assert.deepStrictEqual(Mydate.withObject(), 'Object here!');
assert.deepStrictEqual(Mydate.withReflect(), 'Reflect here!');

// - deleteProperty
const withDelete = { user: 'Felipe' };
// --- baixa performance (evitar)
delete withDelete.user;
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false);

const withReflect = { user: 'Dias' };
Reflect.deleteProperty(withReflect, 'user');
assert.deepStrictEqual(withReflect.hasOwnProperty('user'), false);

// - get
// Devemos fazer um get somente em instâcias de referência
assert.deepStrictEqual(1['username'], undefined);
// Com reflection uma exceção é lançada!
assert.throws(() => Reflect.get(1, 'username'), TypeError);

// - has
assert.ok('superman' in { superman: 'hero' });
assert.ok(Reflect.has({ batman: 'anti-hero' }, 'batman'));

// - ownKeys
const user = Symbol('user');
const myUsers = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'Felipe'
};

// Com os métodos de Object temos que fazer 2 requisições
const objKeys = [
  ...Object.getOwnPropertyNames(myUsers),
  ...Object.getOwnPropertySymbols(myUsers)
]

console.log('objKeys:', objKeys);
assert.deepStrictEqual(objKeys, [ 'id', Symbol.for('password'), user ]);

// Com reflection, só um método
const reflectKeys = [
  ...Reflect.ownKeys(myUsers)
]
console.log('reflectKeys:', reflectKeys);
assert.deepStrictEqual(reflectKeys, [ 'id', Symbol.for('password'), user ]);