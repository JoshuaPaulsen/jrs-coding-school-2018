import React from "react"
import ReactDOM from "react-dom"
import Component from "@reactions/component"

import App from "./app"

const state = {
  answer: null
}

ReactDOM.render(
  <Component initialState={{ answer: "No" }}>{App}</Component>,
  document.getElementById("app")
)
