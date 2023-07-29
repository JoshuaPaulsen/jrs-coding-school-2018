import { SET_STARWARS } from "../constants";
import { SetStarWars } from "./SW";

test("starwars test", () => {
  function mockDispatch(action) {
    expect(action.type).toBe(SET_STARWARS);
    expect(action.payload.length).toBeGreaterThan(0);
  }
  SetStarWars(mockDispatch);
});
