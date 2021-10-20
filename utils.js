const fs = require('fs')
const path = require('path')

const fileName = path.join(__dirname, 'data.json')

const utf8 = 'utf-8'

const utils = {
  addPuppy: function(newPuppy, fnc) {
    // get puppies
    fs.readFile(fileName, utf8, (err, contents) => {
      if (err) {
        // error in reading the file
        fnc(new Error("Failed in reading the file"))
      } else {
        let jsonObj = {}
        try {
          // error in parsing the string data into a JSON object
          jsonObj = JSON.parse(contents)
        } catch (parseError) {
          fnc(new Error("Failed in parsing to the JSON object"))
        }

        const maxId = jsonObj.puppies.reduce((previous,current) => {
          return (previous.id > current.id) ? previous : current
        }).id
        const newId = Number(maxId) + 1

        // add ID to the newPuppy
        newPuppy['id'] = newId

        // add the newPuppy to the puppies array
        jsonObj.puppies = [...jsonObj.puppies, newPuppy]
        let jsonStr = {}
        try {
          // convert the JSON object into string
          jsonStr = JSON.stringify(jsonObj, null, 2)
        } catch (error) {
          fnc(new Error("Failed in stringify the JSON object"))
        }
        // write the stringified data into the file
        fs.writeFile(fileName, jsonStr, utf8, (err) => {
          if (err) {
            fnc(new Error("Failed in writing the file"))
          } else {
            fnc(null, newId)
          }
        })

      }
    })
  },

  updatePuppy: function (newPuppy, fnc) {

    // get puppies
    fs.readFile(fileName, utf8, (err, contents) => {
      if (err) {
        // error in reading the file
        fnc(new Error("Failed in reading the file"))
      } else {
        let jsonObj = {}
        try {
          // error in parsing the string data into a JSON object
          jsonObj = JSON.parse(contents)
        } catch (parseError) {
          fnc(new Error("Failed in parsing to the JSON object"))
        }
        // modify the target puppy
        let oldPuppyIndex = jsonObj.puppies.findIndex((ele) => ele.id == newPuppy.id)
        jsonObj.puppies[oldPuppyIndex] = { ...jsonObj.puppies[oldPuppyIndex], ...newPuppy }
        let jsonStr = {}
        try {
          jsonStr = JSON.stringify(jsonObj, null, 2)
        } catch (error) {
          fnc(new Error("Failed in stringify the JSON object"))
        }
        fs.writeFile(fileName, jsonStr, utf8, (err) => {
          if (err) {
            fnc(new Error("Failed in writing the file"))
          } else {
            fnc(null)
          }
        })
      }
    })
  },

  getPuppy: function (targetId, fnc) {
    fs.readFile(fileName, utf8, (err, contents) => {
      if (err) {
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
  getPuppies: function (fnc) {
    //read the data.json file using fs.readFile
    fs.readFile(fileName, utf8, (err, contents) => {
      if (err) {
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