const BaseRepository = require('./../repository/base/baseRepository');
const Tax = require('./../entities/tax');

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
    this.taxesBasedOnAge = Tax.taxesBasedOnAge;
    this.currencyFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;

    return Math.floor(Math.random() * listLength);
  }

  getRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
    const carId = carCategory.carIds[randomCarIndex];
    
    return carId;
  }

  async getAvailableCar(carCategory) {
    const carId = this.getRandomCar(carCategory);
    const car = await this.carRepository.find(carId);
    return car;
  }

  getRentalPrice(carCategory, customer, numberOfDays) {
    const { age } = customer;
    const { price } = carCategory;
    const { then: tax } = this.taxesBasedOnAge.find(tax => age >= tax.from && age <= tax.to);
    
    const rentalPrice = ((price * tax) * numberOfDays);
    const formattedRentalPrice = this.currencyFormat.format(rentalPrice);

    return formattedRentalPrice;
  }
}

module.exports = CarService;