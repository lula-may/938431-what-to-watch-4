import {extend} from "./utils.js";
import {movies} from "./mocks/films.js";
import {DEFAULT_GENRE, SHOWED_MOVIES_ON_START_COUNT} from "./const.js";

const initialState = {
  count: SHOWED_MOVIES_ON_START_COUNT,
  genre: DEFAULT_GENRE,
  movies,
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  INCREMENT_COUNT: `INCREMENT_COUNT`,
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre
  }),

  incrementCount: () => ({
    type: ActionType.INCREMENT_COUNT,
    payload: SHOWED_MOVIES_ON_START_COUNT
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return extend(state, {
        genre: action.payload
      });
    case ActionType.INCREMENT_COUNT:
      return extend(state, {
        count: state.count + action.payload
      });
  }
  return state;
};

export {ActionCreator, ActionType, reducer};
