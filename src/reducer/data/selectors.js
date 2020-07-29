import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {DEFAULT_GENRE, MAX_GENRES_COUNT} from "../../const.js";

const NAME_SPACE = NameSpace.DATA;

export const getMovies = (state) => {
  return state[NAME_SPACE].movies;
};

export const getActiveMovie = (state) => {
  return state[NAME_SPACE].activeMovie;
};

export const getPromoMovie = (state) => {
  return state[NAME_SPACE].promoMovie;
};

export const getGenre = (state) => {
  return state[NAME_SPACE].genre;
};

export const getLoadingState = (state) => {
  return state[NAME_SPACE].isLoading;
};

export const getErrorState = (state) => {
  return state[NAME_SPACE].hasFilmsLoadingError;
};

export const getUploadingError = (state) => {
  return state[NAME_SPACE].hasUploadingError;
};

export const getUploadingState = (state) => {
  return state[NAME_SPACE].isUploading;
};

export const selectMoviesByGenre = createSelector(
    [getMovies, getGenre],
    (movies, genre) => {
      if (genre === DEFAULT_GENRE) {
        return movies;
      }
      return movies.filter((movie) => movie.genre === genre);
    }
);

export const selectSimilarMovies = createSelector(
    [getMovies, getActiveMovie],
    (movies, activeMovie) => {
      return movies.filter((movie) => movie.genre === activeMovie.genre && movie.id !== activeMovie.id);
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
