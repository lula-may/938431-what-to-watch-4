import {extend} from "./utils.js";
import {movies} from "./mocks/films.js";
import {DEFAULT_GENRE} from "./const.js";

const initialState = {
  movies,
  genre: DEFAULT_GENRE,
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return extend(state, {
        genre: action.payload
      });
  }
  return state;
};

export {ActionCreator, ActionType, reducer};
