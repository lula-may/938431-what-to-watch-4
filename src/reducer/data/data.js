import {extend} from "../../utils.js";
import {adaptMovie, adaptMovies} from "../../adapter.js";
import {DEFAULT_GENRE} from "../../const.js";

const initialState = {
  activeMovie: {},
  genre: DEFAULT_GENRE,
  hasErrors: false,
  isLoading: false,
  movies: [],
  promoMovie: {},
};

const ActionType = {
  END_LOADING: `END_LOADING`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO: `LOAD_PROMO`,
  SET_ACTIVE_MOVIE: `SET_ACTIVE_MOVIE`,
  SET_ERROR: `SET_ERROR`,
  SET_GENRE: `SET_GENRE`,
  START_LOADING: `START_LOADING`,
};

const ActionCreator = {
  endLoading: () => ({
    type: ActionType.END_LOADING,
  }),

  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  }),

  loadPromo: (movie) => ({
    type: ActionType.LOAD_PROMO,
    payload: movie,
  }),

  setActiveMovie: (movie) => ({
    type: ActionType.SET_ACTIVE_MOVIE,
    payload: movie,
  }),

  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre,
  }),

  setError: (hasErrors) => ({
    type: ActionType.SET_ERROR,
    payload: hasErrors,
  }),

  startLoading: () => ({
    type: ActionType.START_LOADING,
  }),
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.startLoading());
    dispatch(ActionCreator.setError(false));
    return api.get(`/films/promo`)
    .then((response) => {
      const promoMovie = adaptMovie(response.data);
      dispatch(ActionCreator.loadPromo(promoMovie));
      dispatch(ActionCreator.setActiveMovie(promoMovie));
    })
    .then(() => api.get(`/films`))
    .then((response) => {
      dispatch(ActionCreator.loadMovies(adaptMovies(response.data)));
      dispatch(ActionCreator.endLoading());
    })
    .catch((err) => {
      dispatch(ActionCreator.endLoading());
      dispatch(ActionCreator.setError(true));
      return err;
    });
  },

  // loadPromo: () => (dispatch, getState, api) => {
  //   dispatch(ActionCreator.startLoading());
  //   dispatch(ActionCreator.setError(false));
  //     dispatch(ActionCreator.endLoading());
  //   })
  //   .catch((err) => {
  //     dispatch(ActionCreator.endLoading());
  //     dispatch(ActionCreator.setError(true));
  //     return err;
  //   });
  // },

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload
      });
    case ActionType.LOAD_PROMO:
      return extend(state, {
        promoMovie: action.payload
      });
    case ActionType.START_LOADING:
      return extend(state, {
        isLoading: true,
      });
    case ActionType.END_LOADING:
      return extend(state, {
        isLoading: false,
      });
    case ActionType.SET_ACTIVE_MOVIE:
      return extend(state, {
        activeMovie: action.payload,
      });
    case ActionType.SET_GENRE:
      return extend(state, {
        genre: action.payload,
      });
    case ActionType.SET_ERROR:
      return extend(state, {
        hasErrors: action.payload,
      });
  }
  return state;
};

export {ActionCreator, ActionType, Operation, reducer};
