const assert = require('assert');

const obj = {};
const arr = [];
const fn = () => {};

// Internamente objetos literais viram funções explícitas
console.log('new Object() is {} ?', new Object().__proto__ === {}.__proto__);
assert.deepStrictEqual(new Object().__proto__, {}.__proto__);

// __proto__ é a referência das propriedades do objeto
console.log('obj.__proto__ === Object.prototype', obj.__proto__ === Object.prototype);
assert.deepStrictEqual(obj.__proto__, Object.prototype);

console.log('arr.__proto__ === Array.prototype', arr.__proto__ === Array.prototype);
assert.deepStrictEqual(arr.__proto__, Array.prototype);

console.log('fn.__proto__ === Function.prototype', fn.__proto__ === Function.prototype);
assert.deepStrictEqual(fn.__proto__, Function.prototype);

// O __proto__ de Object.prototype é null
console.log('obj.__proto__.__proto__ === null', obj.__proto__.__proto__ === null);
assert.deepStrictEqual(obj.__proto__.__proto__, null);

// -------
console.log('-------');

function Employee() {}
Employee.prototype.salary = () => 'salary**';

function Supervisor() {}
// Herda a instância de Employee
Supervisor.prototype = Object.create(Employee.prototype);
Supervisor.prototype.profitShare = () => 'profitShare**';

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**';

// Podemos chamar via prototype, mas se chamar direto dá erro!
console.log('Manager.prototype.salary()', Manager.prototype.salary());
// console.log('Manager.salary()', Manager.salary()); // erro

// Se não chamar o 'new', o primeiro __proto__ vai ser sempre
// a instância de Funtion, sem herdar nossas classes.
// Para acessar as classes sem o 'new', pode acessar direto via prototype.
console.log(
  'Manager.prototype.__proto__ === Supervisor.prototype',
  Manager.prototype.__proto__ === Supervisor.prototype
);
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);

// -------
console.log('-------');

// Quando chamamos o 'new' o __proto__ recebe o prototype do objeto atual
console.log(
  'manager.__proto__: %s, manager.salary(): %s',
  new Manager().__proto__, new Manager().salary()
);
console.log(
  'Supervisor.prototype === new Manager().__proto__.__proto__',
  Supervisor.prototype === new Manager().__proto__.__proto__
);
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__);

// -------
console.log('-------');

const manager = new Manager();
console.log('manager.salary()', manager.salary());
console.log('manager.profitShare()', manager.profitShare());
console.log('manager.monthlyBonuses()', manager.monthlyBonuses());

assert.deepStrictEqual(manager.__proto__, Manager.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null);

// -------
console.log('-------');
