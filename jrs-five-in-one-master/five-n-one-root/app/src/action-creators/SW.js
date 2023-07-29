import {
  SET_STARWARS,
  IS_FETCHING,
  DONE_FETCHING,
  RESET_NEW_STARWARS_FORM,
  CHG_CURRENT_STARWARS
} from "../constants";

import fetch from "isomorphic-fetch";

const URLPath = "http://localhost:5000/starwars";

export const GetStarWars = id => async (dispatch, getState) => {
  const result = await fetch(URLPath + "/" + id);
  const StarWarsCharacter = await result.json();
  dispatch({ type: CHG_CURRENT_STARWARS, payload: StarWarsCharacter });
};

export const SetStarWars = (dispatch, getState) =>
  fetch(URLPath)
    .then(res => res.json())
    .then(starwars => dispatch({ type: SET_STARWARS, payload: starwars }));

export const AddStarWars = (history, starwars) => async (
  dispatch,
  getState
) => {
  const headers = { "Content-Type": "application/json" };
  const method = "POST";
  const body = JSON.stringify(starwars);

  dispatch({ type: IS_FETCHING });
  const result = await fetch(URLPath, { headers, method, body }).then(res =>
    res.json()
  );

  dispatch({ type: DONE_FETCHING });

  if (result.ok) {
    dispatch(SET_STARWARS);
    dispatch({ type: RESET_NEW_STARWARS_FORM });
    history.push("/starwars");
  } else {
    alert(result.msg);
  }
};
