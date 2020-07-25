import {extend} from "../../utils.js";
import {adaptComments, adaptMovie, adaptMovies} from "../../adapter.js";
import {DEFAULT_GENRE} from "../../const.js";
import {ActionCreator as StateActionCreator} from "../app-state/app-state.js";
import {Page} from "../../const.js";

const Url = {
  FILMS: `/films`,
  PROMO: `/films/promo`,
  COMMENTS: `/comments`,
};

const initialState = {
  activeMovie: {},
  comments: [],
  genre: DEFAULT_GENRE,
  hasFilmsLoadingError: false,
  hasCommentUploadingError: false,
  isLoading: false,
  isUploading: false,
  movies: [],
  promoMovie: {},
};

const ActionType = {
  END_LOADING: `END_LOADING`,
  END_UPLOADING: `END_UPLOADING`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO: `LOAD_PROMO`,
  POST_COMMENT: `POST_COMMENT`,
  SET_ACTIVE_MOVIE: `SET_ACTIVE_MOVIE`,
  SET_COMMENT_UPLOADING_ERROR: `SET_COMMENT_UPLOADING_ERROR`,
  SET_FILMS_LOADING_ERROR: `SET_FILMS_LOADING_ERROR`,
  SET_GENRE: `SET_GENRE`,
  SET_MOVIE_COMMENTS: `SET_MOVIE_COMMENTS`,
  START_LOADING: `START_LOADING`,
  START_UPLOADING: `START_UPLOADING`,
};

const ActionCreator = {
  endLoading: () => ({
    type: ActionType.END_LOADING,
  }),

  endUploading: () => ({
    type: ActionType.END_UPLOADING,
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

  setCommentUploadingError: (hasError) => ({
    type: ActionType.SET_COMMENT_UPLOADING_ERROR,
    payload: hasError,
  }),

  setFilmsLoadingError: (hasError) => ({
    type: ActionType.SET_FILMS_LOADING_ERROR,
    payload: hasError,
  }),

  setMovieComments: (comments) => ({
    type: ActionType.SET_MOVIE_COMMENTS,
    payload: comments,
  }),

  startLoading: () => ({
    type: ActionType.START_LOADING,
  }),

  startUploading: () => ({
    type: ActionType.START_UPLOADING,
  })
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.startLoading());
    dispatch(ActionCreator.setFilmsLoadingError(false));
    return api.get(Url.PROMO)
    .then((response) => {
      const promoMovie = adaptMovie(response.data);
      dispatch(ActionCreator.loadPromo(promoMovie));
      dispatch(ActionCreator.setActiveMovie(promoMovie));
    })
    .then(() => api.get(Url.FILMS))
    .then((response) => {
      dispatch(ActionCreator.loadMovies(adaptMovies(response.data)));
      dispatch(ActionCreator.endLoading());
    })
    .catch((err) => {
      dispatch(ActionCreator.endLoading());
      dispatch(ActionCreator.setFilmsLoadingError(true));
      return err;
    });
  },

  postComment: (comment) => (dispatch, getState, api) => {
    const {DATA: {activeMovie: {id}}} = getState();
    dispatch(ActionCreator.startUploading());
    dispatch(ActionCreator.setCommentUploadingError(false));
    return api.post(`${Url.COMMENTS}/${id}`, comment)
    .then((response) => {
      dispatch(ActionCreator.setMovieComments(adaptComments(response.data)));
      dispatch(ActionCreator.endUploading());
      dispatch(StateActionCreator.setPage(Page.DETAILS));
    })
    .catch((err) => {
      dispatch(ActionCreator.setCommentUploadingError(true));
      dispatch(ActionCreator.endUploading());
      return err;
    });
  }
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
    case ActionType.SET_MOVIE_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });
    case ActionType.START_UPLOADING:
      return extend(state, {
        isUploading: true,
      });
    case ActionType.END_UPLOADING:
      return extend(state, {
        isUploading: false,
      });
    case ActionType.SET_COMMENT_UPLOADING_ERROR:
      return extend(state, {
        hasCommentUploadingError: action.payload,
      });
    case ActionType.SET_GENRE:
      return extend(state, {
        genre: action.payload,
      });
    case ActionType.SET_FILMS_LOADING_ERROR:
      return extend(state, {
        hasFilmsLoadingError: action.payload,
      });
  }
  return state;
};

export {ActionCreator, ActionType, Operation, reducer};
