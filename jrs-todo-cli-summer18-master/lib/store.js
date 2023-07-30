const fs = require('fs')

// grab the contents of the file named todos.json, parse it into
// a json object and return it from the function.
//  the json file lives in the current directory where our app is running

function get() {
  return JSON.parse(fs.readFileSync('./todos.json', 'utf-8'))
}

// take in data as a parameter and transform it into text and
// then write the text/json to the file system as the todose.json file. =
function set(data) {
  fs.writeFileSync('./todos.json', JSON.stringify(data))
}

module.exports = { get, set }
