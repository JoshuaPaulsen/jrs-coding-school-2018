import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//import { isFetching } from "./reducers/loading";
import { colors, currentColor } from "./reducers/color";
import { StarWars, CurrentStarWars } from "./reducers/sw";
/*
import { buzzwords, currentBuzzword } from './reducers/buzzwords'
import { starwars, currentStarwars } from './reducers/starwars'
import { cookies, currentCookie } from './reducers/cookies'
import { emojis, currentEmoji } from './reducers/emojis'
*/
export default createStore(
  combineReducers({
    StarWars,
    CurrentStarWars,
    colors,
    currentColor
  }),
  applyMiddleware(thunk)
);
