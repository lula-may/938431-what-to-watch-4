import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {DEFAULT_GENRE} from "../../const.js";

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
  return state[NAME_SPACE].hasErrors;
};

export const getMoviesByGenre = createSelector(
    [getMovies, getGenre],
    (movies, genre) => {
      if (genre === DEFAULT_GENRE) {
        return movies;
      }
      return movies.filter((movie) => movie.genre === genre);
    }
);
