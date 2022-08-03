const File = require('./src/file');
const { rejects, deepEqual } = require('assert');
const { error } = require('./src/constants');

(async() => {
  {
    const filePath = './mocks/emptyFile-invalid.csv';
    const result = File.csvToJson(filePath);
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);

    await rejects(result, rejection);
  }
  
  {
    const filePath = './mocks/fourItems-invalid.csv';
    const result = File.csvToJson(filePath);
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);

    await rejects(result, rejection);
  }
  
  {
    const filePath = './mocks/invalid-header.csv';
    const result = File.csvToJson(filePath);
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);

    await rejects(result, rejection);
  }
  
  {
    const filePath = './mocks/threeItems-valid.csv';
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        "id": 123,
        "name": "Felipe Dias",
        "profession": "JavaScript Developer",
        "age": 32
      },
      {
        "id": 456,
        "name": "Renata Carolina",
        "profession": "Cheff",
        "age": 28
      },
      {
        "id": 789,
        "name": "Anna Valentina",
        "profession": "Student",
        "age": 5
      }
    ]

    await deepEqual(result, expected);
  }
  
})();