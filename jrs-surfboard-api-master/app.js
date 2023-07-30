require("dotenv").config()
const api = require("express")()
const port = process.env.PORT || 5001
const bodyParser = require("body-parser")
const NodeHTTPError = require("node-http-error")
const { propOr, isEmpty, compose, not, join, pathOr } = require("ramda")
const reqFieldChecker = require("./lib/required-field-check")
const {
  addBoard,
  updateBoard,
  deleteBoard,
  deleteBoardPromise,
  listBoards
} = require("./dal")

api.use(bodyParser.json())

api.use((err, req, res, next) => {
  console.log(
    `WIPEOUT! \n\nMETHOD ${req.method} \nPATH ${req.path}\n${JSON.stringify(
      err,
      null,
      2
    )}`
  )
  res.status(err.status || 500).send(err)
})

api.get("/", function(req, res, next) {
  res.send("Welcome to the brocean, brah.  Gnar Gnar.")
})

api.get("/boards", (req, res, next) => {
  const limit = Number(pathOr(10, ["query", "limit"], req)) // "10" or 10
  listBoards(limit)
    .then(boards => res.status(200).send(boards))
    .catch(err => next(new NodeHTTPError(err.status, err.message, err)))
})

// PAGENATE

api.get("/boards", (req, res, next) => {
  const limit = Number(pathOr(3, ["query", "limit"], req))
  const paginate = pathOr(null, ["query", "start_key"], req)
  listBoards(limit, paginate)
    .then(boards => res.status(200).send(boards))
    .catch(err => next(new NodeHTTPError(err.status, err.message, err)))
})

api.post("/boards", (req, res, next) => {
  const newBoard = propOr({}, "body", req)

  if (isEmpty(newBoard)) {
    next(
      new NodeHTTPError(
        400,
        "Brah, add a board to the request body.  Ensure the Content-Type is application/json. Dude!"
      )
    )
  }

  const missingFields = reqFieldChecker(
    ["name", "category", "price", "sku"],
    newBoard
  )

  const sendMissingFieldError = compose(
    not,
    isEmpty
  )(missingFields)

  if (sendMissingFieldError) {
    next(
      new NodeHTTPError(
        400,
        `Brah, you didnt pass all the required fields: ${join(
          ", ",
          missingFields
        )}`,
        { josh: "is Cool and humble", jp: "is Cool" }
      )
    )
  }

  addBoard(newBoard, function(err, result) {
    if (err)
      next(
        new NodeHTTPError(err.status, err.message, { ...err, max: "isCool" })
      )
    res.status(201).send(result)
  })
})

api.put("/boards/:sku", function(req, res, next) {
  const updatedBoard = propOr({}, "body", req)
  //console.log('updatedBoard', updatedBoard)

  if (isEmpty(updatedBoard)) {
    console.log("i dont have a board.")
    next(
      new NodeHTTPError(
        400,
        "Brah, add a board to the request body.  Ensure the Content-Type is application/json. Dude!"
      )
    )
  }

  const missingFields = reqFieldChecker(
    ["_id", "_rev", "name", "category", "price", "sku"],
    updatedBoard
  )

  const sendMissingFieldError = compose(
    not,
    isEmpty
  )(missingFields)

  if (sendMissingFieldError) {
    console.log("I have missing required fields. ")
    next(
      new NodeHTTPError(
        400,
        `Brah, you didnt pass all the required fields: ${join(
          ", ",
          missingFields
        )}`
      )
    )
  }

  updateBoard(updatedBoard, function(err, result) {
    if (err) next(new NodeHTTPError(err.status, err.message))
    res.status(200).send(result)
  })
})

api.delete("/boards/:sku", (req, res, next) =>
  deleteBoardPromise(`board_${req.params.sku}`)
    .then(result => res.status(200).send(result))
    .catch(err => next(new NodeHTTPError(err.status, err.message, err)))
)

api.listen(port, () => console.log("Brah!", port))
