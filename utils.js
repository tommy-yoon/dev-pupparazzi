const fs = require('fs')
const path = require('path')

// return JSON object of puppies
function getPuppies(fnc) {
  const fileName = path.join(__dirname, 'data.json')
  fs.readFile(fileName, 'utf-8', (err, contents) => {
    if(err) {
      fnc(new Error("Failed in reading the file"))
    } else {
      try {
        const jsonObject = JSON.parse(contents)
        fnc(null, jsonObject)
      } catch (parseError) {
        fnc(new Error("Failed in parsing the JSON object"))
      }
    }
  })
}

module.exports = {
  getPuppies
}