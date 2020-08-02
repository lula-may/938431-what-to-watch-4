import {extend} from "../../utils.js";
import {adaptComments, adaptMovie, adaptMovies} from "../../adapter.js";
import {DEFAULT_GENRE} from "../../const.js";
import history from "../../history.js";
const Url = {
  FAVORITE: `/favorite`,
  FILMS: `/films`,
  PROMO: `/films/promo`,
  COMMENTS: `/comments`,
};

const initialState = {
  activeMovie: {},
  comments: [],
  favoriteMovies: [],
  genre: DEFAULT_GENRE,
  hasLoadingError: false,
  hasUploadingError: false,
  isLoading: false,
  isUploading: false,
  movies: [],
  promoMovie: {},
};

const ActionType = {
  END_LOADING: `END_LOADING`,
  END_UPLOADING: `END_UPLOADING`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO: `LOAD_PROMO`,
  POST_COMMENT: `POST_COMMENT`,
  RESET_ACTIVE_MOVIE: `RESET_ACTIVE_MOVIE`,
  SET_ACTIVE_MOVIE: `SET_ACTIVE_MOVIE`,
  SET_UPLOADING_ERROR: `SET_UPLOADING_ERROR`,
  SET_LOADING_ERROR: `SET_LOADING_ERROR`,
  SET_GENRE: `SET_GENRE`,
  SET_MOVIE_COMMENTS: `SET_MOVIE_COMMENTS`,
  START_LOADING: `START_LOADING`,
  START_UPLOADING: `START_UPLOADING`,
  UPDATE_ACTIVE_MOVIE: `UPDATE_ACTIVE_MOVIE`,
  LOAD_FAVORITE_MOVIES: `LOAD_FAVORITE_MOVIES`,
};

const getFavoriteMovies = (movies) => movies.filter(({isFavorite}) => isFavorite);

const updateMovies = (movies, movie) => {
  const index = movies.findIndex((item) => item.id === movie.id);
  if (index !== -1) {
    return [...movies.slice(0, index), movie, ...movies.slice(index + 1)];
  }
  return movies;
};

const ActionCreator = {
  endLoading: () => ({
    type: ActionType.END_LOADING,
  }),

  endUploading: () => ({
    type: ActionType.END_UPLOADING,
  }),

  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments,
  }),

  loadFavoriteMovies: (movies) => ({
    type: ActionType.LOAD_FAVORITE_MOVIES,
    payload: movies,
  }),

  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  }),

  loadPromo: (movie) => ({
    type: ActionType.LOAD_PROMO,
    payload: movie,
  }),

  resetActiveMovie: () => ({
    type: ActionType.RESET_ACTIVE_MOVIE,
  }),

  setActiveMovie: (movie) => ({
    type: ActionType.SET_ACTIVE_MOVIE,
    payload: movie,
  }),

  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre,
  }),

  setUploadingError: (hasError) => ({
    type: ActionType.SET_UPLOADING_ERROR,
    payload: hasError,
  }),

  setLoadingError: (hasError) => ({
    type: ActionType.SET_LOADING_ERROR,
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
  }),

};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.startLoading());
    dispatch(ActionCreator.setLoadingError(false));
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
      dispatch(ActionCreator.setLoadingError(true));
      return err;
    });
  },

  loadComments: (id) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setLoadingError(false));
    return api.get(`${Url.COMMENTS}/${id}`)
    .then((response) => {
      dispatch(ActionCreator.loadComments(adaptComments(response.data)));
    })
    .catch((err) => {
      dispatch(ActionCreator.setLoadingError(true));
      return err;
    });
  },

  postComment: (comment) => (dispatch, getState, api) => {
    const {DATA: {activeMovie}} = getState();
    dispatch(ActionCreator.startUploading());
    dispatch(ActionCreator.setUploadingError(false));
    return api.post(`${Url.COMMENTS}/${activeMovie.id}`, comment)
    .then((response) => {
      dispatch(ActionCreator.setMovieComments(adaptComments(response.data)));
      dispatch(ActionCreator.endUploading());
      history.push(`/films/${activeMovie.id}`);
    })
    .catch((err) => {
      dispatch(ActionCreator.setUploadingError(true));
      dispatch(ActionCreator.endUploading());
      return err;
    });
  },

  updateFavoriteMovies: (movie) => (dispatch, getState, api) => {
    const {id, isFavorite} = movie;
    const {DATA: {movies, promoMovie}} = getState();
    const status = isFavorite ? 0 : 1;
    const isPromo = id === promoMovie.id;

    dispatch(ActionCreator.startUploading());
    dispatch(ActionCreator.setUploadingError(false));
    return api.post(`${Url.FAVORITE}/${id}/${status}`)
    .then((response) => {
      const updatedMovie = adaptMovie(response.data);
      const updatedMovies = updateMovies(movies, updatedMovie);
      const favoriteMovies = getFavoriteMovies(updatedMovies);
      dispatch(ActionCreator.endUploading());
      if (isPromo) {
        dispatch(ActionCreator.loadPromo(updatedMovie));
      }
      dispatch(ActionCreator.setActiveMovie(updatedMovie));
      dispatch(ActionCreator.loadMovies(updatedMovies));
      dispatch(ActionCreator.loadFavoriteMovies(favoriteMovies));
    })
    .catch((err) => {
      dispatch(ActionCreator.setUploadingError(true));
      dispatch(ActionCreator.endUploading());
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
    case ActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });
    case ActionType.LOAD_PROMO:
      return extend(state, {
        promoMovie: action.payload
      });
    case ActionType.START_LOADING:
      return extend(state, {
        isLoading: true,
      });
    case ActionType.LOAD_FAVORITE_MOVIES:
      return extend(state, {
        favoriteMovies: action.payload,
      });
    case ActionType.END_LOADING:
      return extend(state, {
        isLoading: false,
      });
    case ActionType.RESET_ACTIVE_MOVIE:
      return extend(state, {
        activeMovie: state.promoMovie.id,
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
    case ActionType.SET_UPLOADING_ERROR:
      return extend(state, {
        hasUploadingError: action.payload,
      });
    case ActionType.SET_GENRE:
      return extend(state, {
        genre: action.payload,
      });
    case ActionType.SET_LOADING_ERROR:
      return extend(state, {
        hasLoadingError: action.payload,
      });
  }
  return state;
};

export {ActionCreator, ActionType, Operation, reducer};
