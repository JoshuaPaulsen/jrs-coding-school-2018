// 1) get() the list of todos from the store that manages the todos.json
// 2) create a new todo object using the array of words send in with the command
// ... todo add feed the cat.
// ... { text: "feed the cat", completed: false, id: ?? + 1}
// 3) add the objects to the array of todos.
// 4) set() the array of todos to the todos.json fole.

const store = require("../lib/store.js")
const { join, append } = require("ramda")
const ls = require("./ls")
// 1) get() the list of todos from the store that manages the todos.json

module.exports = function(arrWords) {
  const todos = store.get()

  //  2) create a new todo object using the array of words send in with the command
  // todo add feed the cat.
  const newTodo = createTodo(arrWords, todos.length)

  // 3) add the objects to the array of todos.
  const newArray = append(newTodo, todos)

  // 4) set() the array of todos to the todos.json fole.
  store.set(newArray)
  ls()

  function createTodo(arrWords, lastID) {
    return { text: join(" ", arrWords), completed: false, id: lastID + 1 }
  }
}
