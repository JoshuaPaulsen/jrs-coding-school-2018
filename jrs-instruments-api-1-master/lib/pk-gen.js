const { compose, toLower, replace, concat, trim } = require('ramda')

module.exports = (prefix, replaceVal, str) =>
  compose(
    toLower,
    replace(/ /g, replaceVal),
    concat(prefix),
    concat('_'),
    trim
  )(str)
