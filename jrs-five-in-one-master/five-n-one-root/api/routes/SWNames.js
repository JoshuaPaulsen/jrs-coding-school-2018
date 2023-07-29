const starwars = require("starwars-names");
const {
  map,
  propOr,
  isEmpty,
  merge,
  compose,
  append,
  ascend,
  prop,
  sort,
  propEq,
  find
} = require("ramda");

const uuid = require("uuid");
const bodyParser = require("body-parser");

const StarWarsList = prop("all", starwars);

const StarWarsCreate = sw => ({
  id: uuid.v4(),
  name: sw
});

let StarWarsCharacters = map(StarWarsCreate, StarWarsList);

module.exports = app => {
  app.get("/starwars", (req, res) => res.send(StarWarsCharacters));
  app.post("/starwars", bodyParser.json(), (req, res) => {
    let NewStarWarsCharacter = propOr({}, "body", "req");
    if (isEmpty(NewStarWarsCharacter)) {
      res.status(500).send({
        ok: false,
        msg:
          "Please provide proper JSON documentation. id and name keys are required in the request body."
      });
      return;
    }
    NewStarWarsCharacter = merge(NewStarWarsCharacter, { id: uuid.v4() });
    StarWarsCharacters = compose(
      sort(ascend(prop("name"))),
      append(NewStarWarsCharacter)
    )(StarWarsCharacters);
    res.status(201).send({ ok: true });
  });
  app.get("/starwars/:id", (req, res) => {
    res.status(200).send(find(propEq("id", req.params.id), StarWarsCharacters));
  });
};
