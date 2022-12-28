/**
 * O objetivo do Fluent API é executar tarefas
 * como um pipeline, step by step
 * e no fim chama o build. Muito similar ao padrão Builder.
 * A diferença é que aqui é sobre processos e o Builder é
 * sobre construção de objetos.
 */
class TextProcessorFluentAPI {
  // propriedade privada
  #content;
  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    const matchPerson = /((?<=contratante:\s{1})|(?<=contratada:\s{1}))(?!\s)(.*\n.*?)$/gmi;
    const onlyPerson = this.#content.match(matchPerson);

    this.#content = onlyPerson;
    
    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;