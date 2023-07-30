require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))

const { merge, prop, map } = require('ramda')
const pkGen = require('./lib/pk-gen')

const db = new PouchDB(
  `${process.env.COUCH_HOSTNAME}${process.env.COUCH_DBNAME}`
)

const addPainting = (painting, callback) => {
  db.put(painting, callback)
}

const updatePainting = (painting, callback) => {
  db.put(painting, callback)
}

const getPainting = paintingID => db.get(paintingID)

const listPaintings = limit =>
  db
    .allDocs({ include_docs: true, limit })
    .then(response => map(prop('doc'), response.rows))

const deletePainting = (paintingID, callback) => {
  return db.get(paintingID, function(err, retrievedDocument) {
    if (err) {
      callback(err)
      return
    }

    db.remove(retrievedDocument, function(err, removedResult) {
      if (err) {
        callback(err)
        return
      }
      callback(null, removedResult)
      return
    })
  })
}

module.exports = {
  listPaintings,
  getPainting,
  deletePainting,
  addPainting,
  updatePainting
}
