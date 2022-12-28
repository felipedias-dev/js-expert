'use strict';

const { readFile } = require('fs/promises');
const { join } = require('path');
const pdfParse = require('pdf-parse');

(async () => {
  const dataBuffer = await readFile(join(__dirname, './../../../docs/contrato.pdf'));
  const data = await pdfParse(dataBuffer);
  console.log(data.text);
})();