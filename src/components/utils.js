import {DEFAULT_GENRE} from "../const.js";

const getMoviesByGenre = (genre, allMovies) => {
  if (genre === DEFAULT_GENRE) {
    return allMovies;
  }
  return allMovies.filter((movie) => movie.genre === genre);
};

export {getMoviesByGenre};
