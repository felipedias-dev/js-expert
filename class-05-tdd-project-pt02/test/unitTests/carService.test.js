const { describe, it, before } = require('mocha');
const assert = require('assert');
const { join } = require('path');
const { expect } = require('chai');

const CarService = require('../../src/service/carService');
const mocks = {
  validCar: require('../mocks/valid-car.json'),
  validCarCategory: require('../mocks/valid-carCategory.json'),
  validCustomer: require('../mocks/valid-customer.json'),
};

const carsDatabase = join(__dirname, '../../database', 'cars.json');

describe('CarService Suite Tests', () => {
  let carService = {};
  
  before(() => {
    carService = new CarService({ cars: carsDatabase });
  })

  it('should retrieve a random position from an array', () => {
    const data = [ 0, 1, 2, 3, 4 ];
    const result = carService.getRandomPositionFromArray(data);

    expect(result).to.be.lt(data.length).and.be.gte(0);
  })

  // it('should return an available car for a given carCategory', async () => {
  //   const car = mocks.validCar;
  //   const carCategory = Object.create(mocks.validCarCategory);

  //   carCategory.carIds = [ car.id ];
    
  //   const result = await carService.getAvailableCar(carCategory);
  //   const expected = car;

  //   assert.deepStrictEqual(result, expected);
  // })
})