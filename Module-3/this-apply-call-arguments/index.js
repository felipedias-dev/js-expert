'use strict';

const { watch, promises: { readFile } } = require('fs');

// watch(__filename, async (event, filename) => {
//   console.log((await readFile(filename)).toString());
// });

class File {
  watch(event, filename) {
    console.log('this:', this);
    console.log('arguments:', Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

const file = new File();

// Dessa forma o "this" da classe File é ignorado.
// O "this" do fs.watch é herdado.
// watch(__filename, file.watch)

// Alternativa para não herdar o "this" da função fs.watch.
// Modo Junior.
// watch(__filename, (event, filename) => file.watch(event, filename));

// Modo Senior.
// Deixar explícito qual é o contexto que a função deve seguir.
// O "bind" retorna uma função com o "this" que se mantém da classe File
// watch(__filename, file.watch.bind(file));

// A diferença entre o "call" e o "apply" é a forma de passar os argumentos: lista ou array
file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename);
file.watch.apply({ showContent: () => console.log('apply: hey sinon!') }, [null, __filename]);
