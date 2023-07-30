require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))

const { merge, prop, map } = require('ramda')
const pkGen = require('./lib/pk-gen')

const db = new PouchDB(
  `${process.env.COUCH_HOSTNAME}${process.env.COUCH_DBNAME}`
)

const addBoard = (board, cb) => {
  const modifiedBoard = merge(board, {
    type: 'board',
    _id: pkGen('board_', '-', prop('sku', board))
  })
  db.put(modifiedBoard, cb)
}

const updateBoard = (board, cb) => {
  console.log('i made it to updateBoard')

  db.put(board, cb)
}

const deleteBoard = (id, cb) => {
  db.get(id, function(err, board) {
    db.remove(board, cb)
  })
}

const deleteBoardPromise = id =>
  db.get(id).then(function(doc) {
    return db.remove(doc)
  })

const getBoard = id => db.get(id)

const listBoards = limit =>
  db
    .allDocs({ include_docs: true, limit })
    .then(response => map(prop('doc'), response.rows))

module.exports = {
  addBoard,
  updateBoard,
  deleteBoard,
  getBoard,
  deleteBoardPromise,
  listBoards
}
