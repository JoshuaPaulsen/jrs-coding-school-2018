import React from "react"
import EightBall from "eightball-extensible"

const e = new EightBall({})

const App = ({ state, setState }) => {
  return (
    <div>
      <h1 align="center">Magic Eight Ball</h1>
      <p align="center">Insert Instructions here</p>
      <form align="center">
        <label>Ask me a yes or no question?</label>
        <br />
        <br />
        <textarea />
      </form>
      <button
        onClick={() =>
          e.consult().then(response => {
            setState({ answer: response })
          })
        }
      >
        Predict
      </button>
      {state.answer ? <div style={box}>{state.answer}</div> : null}
    </div>
  )
}

const box = {
  border: "3px solid black",
  padding: "16px",
  marginTop: "16px"
}

export default App
