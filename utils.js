const fs = require('fs')
const path = require('path')

const fileName = path.join(__dirname, 'data.json')

const utf8 = 'utf-8'

const utils = {
  
  getPuppy: function(targetId, fnc) {
    fs.readFile(fileName, utf8, (err, contents) => {
      if(err) {
        fnc(new Error("Failed in reading the file"))
      } else {
        try {
          // error in parsing the string data into a JSON object
          const jsonObject = JSON.parse(contents)
          fnc(null, jsonObject.puppies.find(ele => ele.id == targetId))
        } catch (parseError) {
          fnc(new Error("Failed in parsing the JSON object"))
        }
      }
    })
  },
  
  // return JSON object of puppies 
  getPuppies: function(fnc) {
    //read the data.json file using fs.readFile
    fs.readFile(fileName, utf8, (err, contents) => {
      if(err) {
        // error in reading the file
        fnc(new Error("Failed in reading the file"))
      } else {
        try {
          // error in parsing the string data into a JSON object
          const jsonObject = JSON.parse(contents)
          fnc(null, jsonObject)
        } catch (parseError) {
          fnc(new Error("Failed in parsing the JSON object"))
        }
      }
    })
  }
}

module.exports = utils