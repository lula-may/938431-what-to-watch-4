import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {getGenre, getActiveMovie} from "../app-state/selectors.js";
import {DEFAULT_GENRE, MAX_GENRES_COUNT} from "../../const.js";

const NAME_SPACE = NameSpace.DATA;

export const getMovies = (state) => {
  return state[NAME_SPACE].movies;
};

export const getMovieComments = (state) => {
  return state[NAME_SPACE].comments;
};

export const getPromoMovie = (state) => {
  return state[NAME_SPACE].promoMovie;
};

export const getLoadingState = (state) => {
  return state[NAME_SPACE].isLoading;
};

export const getLoadingError = (state) => {
  return state[NAME_SPACE].hasLoadingError;
};

export const getUploadingError = (state) => {
  return state[NAME_SPACE].hasUploadingError;
};

export const getUploadingState = (state) => {
  return state[NAME_SPACE].isUploading;
};

export const getMovieById = (state, id) => {
  const movies = state[NAME_SPACE].movies;
  return movies.find((movie) => movie.id === parseInt(id, 10));
};

export const selectMoviesByGenre = createSelector(
    [getMovies, getGenre],
    (movies, genre) => {
      return genre === DEFAULT_GENRE
        ? movies
        : movies.filter((movie) => movie.genre === genre);
    }
);

export const selectSimilarMovies = createSelector(
    [getMovies, getActiveMovie],
    (movies, activeMovie) => {
      const {genre, id} = activeMovie;
      return movies.filter((movie) => movie.genre === genre && movie.id !== id);
    }
);

export const selectMoviesGenres = createSelector(
    getMovies,
    (movies) => {
      const genres = movies.map((movie) => movie.genre)
        .filter((item, i, items) => items.indexOf(item) === i)
        .slice(0, MAX_GENRES_COUNT);
      genres.unshift(DEFAULT_GENRE);
      return genres;
    }
);
