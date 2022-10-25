import { describe, it } from 'mocha';
import { expect } from 'chai';

import Person from '../src/person.js';

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString('1 Bike,Carro 20000 2022-08-15 2022-10-22');
    const expected = {
      from: '2022-08-15',
      to: '2022-10-22',
      vehicles: ['Bike', 'Carro'],
      kmTraveled: '20000',
      id: '1'
    }

    expect(person).to.be.deep.equal(expected);
  })

  it('should format values', () => {
    const person = new Person({
      from: '2022-08-15',
      to: '2022-10-22',
      vehicles: ['Bike', 'Carro'],
      kmTraveled: '20000',
      id: '1'
    });

    const result = person.formatted('pt-BR');

    const expected = {
      id: 1,
      vehicles: 'Bike e Carro',
      kmTraveled: '20.000 km',
      from: '15 de agosto de 2022',
      to: '22 de outubro de 2022'
    };

    expect(result).to.be.deep.equal(expected);
  })
})