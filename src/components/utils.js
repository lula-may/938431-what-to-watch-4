import {DEFAULT_GENRE} from "../const.js";

const getMoviesByGenre = (genre, allMovies, count) => {
  if (genre === DEFAULT_GENRE) {
    return allMovies.slice(0, count);
  }
  return allMovies.filter((movie) => movie.genre === genre).slice(0, count);
};

export {getMoviesByGenre};
