require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))

//  https://admin:h3aPtsz4ou86@tripster.jrscode.cloud/instruments
// COUCH_HOSTNAME
// COUCH_DBNAME
const db = new PouchDB(
  `${process.env.COUCH_HOSTNAME}${process.env.COUCH_DBNAME}`
)

const instruments = [
  {
    _id: 'instrument_cello_cello_platinum',
    name: 'Cello Platinum',
    type: 'instrument',
    category: 'cello',
    group: 'strings',
    retailPrice: 600,
    manufacturer: 'Strings, Inc.'
  },
  {
    _id: 'instrument_cello_cello_silver',
    name: 'Cello Silver',
    type: 'instrument',
    category: 'cello',
    group: 'strings',
    retailPrice: 350,
    manufacturer: 'Strings, Inc.'
  },
  {
    _id: 'instrument_oboe_oboe_beethoven',
    name: 'Oboe Beethoven',
    type: 'instrument',
    category: 'Oboe',
    group: 'winds',
    retailPrice: 599,
    manufacturer: 'Symphonic, Inc.'
  },
  {
    _id: 'instrument_piccolo_piccolo_bach',
    name: 'Piccolo Bach',
    type: 'instrument',
    category: 'piccolo',
    group: 'winds',
    retailPrice: 300,
    manufacturer: 'Symphonic, Inc.'
  },
  {
    _id: 'instrument_piccolo_piccolo_beethoven',
    name: 'Piccolo Beethoven',
    type: 'instrument',
    category: 'piccolo',
    group: 'winds',
    retailPrice: 500,
    manufacturer: 'Symphonic, Inc.'
  },
  {
    _id: 'instrument_saxophone_jazzy_100',
    name: 'Jazzy 100',
    type: 'instrument',
    category: 'saxophone',
    group: 'winds',
    retailPrice: 300,
    manufacturer: 'Musical Winds, Inc.'
  },
  {
    _id: 'instrument_saxophone_jazzy_200',
    name: 'Jazzy 200',
    type: 'instrument',
    category: 'saxophone',
    group: 'winds',
    retailPrice: 400,
    manufacturer: 'Musical Winds, Inc.'
  },
  {
    _id: 'instrument_tuba_tubanator',
    name: 'Tubanator',
    type: 'instrument',
    category: 'tuba',
    group: 'brass',
    retailPrice: 400,
    manufacturer: 'Brasstastic, Inc.'
  },
  {
    _id: 'instrument_viola_standard_100',
    name: 'Standard 100',
    type: 'instrument',
    category: 'viola',
    group: 'strings',
    retailPrice: 299,
    manufacturer: 'String Music, Inc.'
  },
  {
    _id: 'instrument_violin_delux_200',
    name: 'Delux 200',
    type: 'instrument',
    category: 'violin',
    group: 'strings',
    retailPrice: 599,
    manufacturer: 'Violins, Inc.'
  },
  {
    _id: 'instrument_violin_delux_300',
    name: 'Delux 300',
    type: 'instrument',
    category: 'violin',
    group: 'strings',
    retailPrice: 599,
    manufacturer: 'Violins, Inc.'
  }
]

db.bulkDocs(instruments, function(err, result) {
  if (err) {
    console.log('ERROR', err)
    return
  }
  console.log('success', result)
})
