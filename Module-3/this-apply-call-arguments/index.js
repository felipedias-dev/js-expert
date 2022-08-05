'use strict';

const { watch, promises: { readFile } } = require('fs');

watch(__filename, async (event, filename) => {
  console.log((await readFile(filename)).toString());
});
