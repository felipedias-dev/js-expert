const { readFile } = require('fs/promises')
const { join } = require('path')
const { error } = require('./constants')

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age']
}

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath)
    const validation = File.isValid(content)

    if (!validation.valid) throw new Error(validation.error)
    
    return content
  }

  static async getFileContent(filePath) {
    const fileName = join(__dirname, filePath)
    
    return (await readFile(fileName)).toString('utf8')
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...fileWithoutHeader] = csvString.split('\n')
    const isHeaderValid = header === options.fields.join(',')

    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }

    const isContentLenghtAccepted = (
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= options.maxLines
    )

    if (!isContentLenghtAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }

    return { valid: true }
  }
}

(async () => {
  const result = await File.csvToJson('./../mocks/threeItems-valid.csv')
  // const result = await File.csvToJson('./../mocks/fourItems-invalid.csv')
  // const result = await File.csvToJson('./../mocks/emptyFile-invalid.csv')
  // const result = await File.csvToJson('./../mocks/invalid-header.csv')
  
  console.log(result)
})()