const { head } = require("ramda")
const add = require("./cmd/add")
const [execNodePath, jsPath, cmd, ...everythingelse] = process.argv
const ls = require("./cmd/ls")
//console.log("process.argv", process.argv)

// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`)
// })

console.log(handleCmd(cmd))

function handleCmd(cmd) {
  // 'add', 'init', 'rm'
  switch (cmd) {
    case "init":
      return "you asked for the init cmd"
    case "add":
      return add(everythingelse)
    case "rm":
      return "you asked for the rm cmd"
    case "ls":
      return ls()
    default:
      return `${cmd} is not supported`
  }
}
