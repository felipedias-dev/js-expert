'use strict'

const assert = require('assert');
const Event = require('events');

const event = new Event();
const eventName = 'counter';

event.on(eventName, msg => console.log('counter updated:', msg));

const myCounter = {
  counter: 0
};

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] });
    target[propertyKey] = newValue;

    return true;
  },

  get: (object, prop) => {
    // console.log('chamou:', { object, prop });

    return object[prop];
  }
});

setInterval( function () {
  console.log('[3]: setInterval');
  proxy.counter += 1;

  if (proxy.counter === 10) clearInterval(this);
}, 1000);


setTimeout(() => {
  console.log('[2]: setTimeout');
  proxy.counter = 4;
}, 500);

setImmediate(() => {
  console.log('[1]: setImmediate', proxy.counter);
});

// executa agora, agorinha, mas acaba com o ciclo de vida do node
process.nextTick(() => {
  console.log('[0]: nextTick');
  proxy.counter = 2;
})
