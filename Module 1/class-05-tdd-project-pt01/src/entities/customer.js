const Base = require('./base/base');

class Customer extends Base {
  constructor({ id, name, cpf }) {
    super({ id, name });

    this.cpf = cpf;
  }
}

module.exports = Customer;