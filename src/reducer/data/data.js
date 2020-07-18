import {extend} from "../../utils.js";

const initialState = {
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
  }),

  endLoading: () => ({
    type: ActionType.END_LOADING,
  }),

  setError: (hasErrors) => ({
    type: ActionType.SET_ERROR,
    payload: hasErrors,
  })
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.startLoading());
    dispatch(ActionCreator.setError(false));
    return api.get(`/films`)
    .then((response) => {
      dispatch(ActionCreator.loadMovies(response.data));
      dispatch(ActionCreator.endLoading());
    })
    .catch((err) => {
      dispatch(ActionCreator.endLoading());
      dispatch(ActionCreator.setError(true));
      return err;
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
        hasErrors: action.payload,
      });
  }
  return state;
};

export {ActionCreator, ActionType, Operation, reducer};
