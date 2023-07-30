const { compose, replace, concat } = require('ramda')

module.exports = (prefix, delimeter, pkValue) =>
  compose(replace(/ /g, delimeter), concat(prefix))(pkValue)
