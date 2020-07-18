import {extend} from "../../utils.js";
import {DEFAULT_GENRE, SHOWED_MOVIES_ON_START_COUNT} from "../../const.js";

const initialState = {
  moviesCount: SHOWED_MOVIES_ON_START_COUNT,
  genre: DEFAULT_GENRE,
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  INCREMENT_MOVIES_COUNT: `INCREMENT_MOVIES_COUNT`,
  RESET_COUNT: `RESET_COUNT`,
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre
  }),

  incrementMoviesCount: () => ({
    type: ActionType.INCREMENT_MOVIES_COUNT,
    payload: SHOWED_MOVIES_ON_START_COUNT
  }),

  resetCount: () => ({
    type: ActionType.RESET_COUNT,
    payload: null,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return extend(state, {
        genre: action.payload
      });
    case ActionType.INCREMENT_MOVIES_COUNT:
      return extend(state, {
        moviesCount: state.moviesCount + action.payload
      });
    case ActionType.RESET_COUNT:
      return extend(state, {moviesCount: SHOWED_MOVIES_ON_START_COUNT});
  }
  return state;
};

export {ActionCreator, ActionType, reducer};
