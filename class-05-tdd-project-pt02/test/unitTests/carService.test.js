const { describe, it, before, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');
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
  let sandbox = {};
  
  before(() => {
    carService = new CarService({ cars: carsDatabase });
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  })

  afterEach(() => {
    sandbox.restore();
  })

  it('should retrieve a random position from an array', () => {
    const data = [ 0, 1, 2, 3, 4 ];
    const result = carService.getRandomPositionFromArray(data);

    expect(result).to.be.lt(data.length).and.be.gte(0);
  })

  it('should choose the first id from carIds in carCategory', () => {
    const carCategory = mocks.validCarCategory;
    const carIdIndex = 0;

    sandbox.stub(
      carService,
      carService.getRandomPositionFromArray.name
    ).returns(carIdIndex);

    const result = carService.getRandomCar(carCategory);
    const expected = carCategory.carIds[carIdIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.eq(expected);
  })

  it('should return an available car for a given carCategory', async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCarCategory);

    carCategory.carIds = [ car.id ];

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).resolves(car);

    sandbox.spy(
      carService,
      carService.getRandomCar.name
    );
    
    const result = await carService.getAvailableCar(carCategory);
    const expected = car;

    expect(carService.getRandomCar.calledOnce).to.be.ok;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok;
    expect(result).to.be.deep.eq(expected);
  })
})