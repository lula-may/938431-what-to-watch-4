import {extend} from "../../utils.js";
import {DEFAULT_GENRE, SHOWED_MOVIES_ON_START_COUNT} from "../../const.js";

const initialState = {
  activeMovie: {},
  genre: DEFAULT_GENRE,
  moviesCount: SHOWED_MOVIES_ON_START_COUNT,
};

const ActionType = {
  INCREMENT_MOVIES_COUNT: `INCREMENT_MOVIES_COUNT`,
  RESET_ACTIVE_MOVIE: `RESET_ACTIVE_MOVIE`,
  RESET_COUNT: `RESET_COUNT`,
  SET_ACTIVE_MOVIE: `SET_ACTIVE_MOVIE`,
  SET_GENRE: `SET_GENRE`,
};

const ActionCreator = {
  incrementMoviesCount: () => ({
    type: ActionType.INCREMENT_MOVIES_COUNT,
    payload: SHOWED_MOVIES_ON_START_COUNT
  }),

  resetActiveMovie: () => ({
    type: ActionType.RESET_ACTIVE_MOVIE,
  }),

  resetCount: () => ({
    type: ActionType.RESET_COUNT,
    payload: null,
  }),

  setActiveMovie: (movie) => ({
    type: ActionType.SET_ACTIVE_MOVIE,
    payload: movie,
  }),

  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_MOVIES_COUNT:
      return extend(state, {
        moviesCount: state.moviesCount + action.payload,
      });
    case ActionType.RESET_COUNT:
      return extend(state, {
        moviesCount: SHOWED_MOVIES_ON_START_COUNT,
      });
    case ActionType.RESET_ACTIVE_MOVIE:
      return extend(state, {
        activeMovie: state.promoMovie.id,
      });
    case ActionType.SET_ACTIVE_MOVIE:
      return extend(state, {
        activeMovie: action.payload,
      });
    case ActionType.SET_GENRE:
      return extend(state, {
        genre: action.payload,
      });
  }
  return state;
};

export {ActionCreator, ActionType, reducer};
