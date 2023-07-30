const store = require("../lib/store")
const { pipe, map, join } = require("ramda")

/*
1) get() the todo list from the store
2) draw a header
3) map over the list and produce a list item for each object in the array
4) create a list item function for the map - take in an object and return a string list item.
5) draw the footer
6) return the result from the function.

My To Do List
 ---------------------------------------
 [X] - 1 cut grass
 [X] - 2 make dinner
 [ ] - 3 eat dinner
 ---------------------------------------
 */

function ls() {
  const todos = store.get()

  const li = function(todo) {
    return `[${todo.completed === true ? "X" : " "} - ${todo.id} ${todo.text}]`
  }

  const mappedListItems = pipe(
    map(li),
    join("\n  ")
  )(todos)

  const result = `
  My To Do List
  ---------------------------------------
  ${mappedListItems}
  ---------------------------------------
`
  return result
}

module.exports = ls
