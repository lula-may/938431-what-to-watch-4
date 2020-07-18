import {extend} from "../../utils.js";

const initialState = {
  error: undefined,
  hasErrors: false,
  isLoading: false,
  movies: [],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  START_LOADING: `START_LOADING`,
  END_LOADING: `END_LOADING`,
  SET_ERROR: `SET_ERROR`,
};

const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  }),

  startLoading: () => ({
    type: ActionType.START_LOADING,
    payload: null,
  }),

  endLoading: () => ({
    type: ActionType.END_LOADING,
    payload: null,
  }),

  setError: (err) => ({
    type: ActionType.SET_ERROR,
    payload: err.message,
  })
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.startLoading());
    return api.get(`/films`)
    .then((response) => {
      dispatch(ActionCreator.loadMovies(response.data));
      dispatch(ActionCreator.endLoading());
    })
    .catch((err) => {
      dispatch(ActionCreator.endLoading());
      dispatch(ActionCreator.setError(err));
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload
      });
    case ActionType.START_LOADING:
      return extend(state, {
        isLoading: true,
      });
    case ActionType.END_LOADING:
      return extend(state, {
        isLoading: false,
      });
    case ActionType.SET_ERROR:
      return extend(state, {
        error: action.payload,
        hasErrors: true,
      });
  }
  return state;
};

export {ActionCreator, ActionType, Operation, reducer};
