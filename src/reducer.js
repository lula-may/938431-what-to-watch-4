import {extend} from "./utils.js";
import {movies} from "./mocks/films.js";
import {DEFAULT_GENRE, SHOWED_MOVIES_ON_START_COUNT} from "./const.js";

const initialState = {
  allMovies: movies,
  genre: `All genres`,
  showedMovies: movies.slice(0, SHOWED_MOVIES_ON_START_COUNT),
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  SET_SHOWED_FILMS: `SET_SHOWED_FILMS`,
};

const getMoviesByGenre = (genre, allMovies, count) => {
  if (genre === DEFAULT_GENRE) {
    return allMovies.slice(0, count);
  }
  return allMovies.filter((movie) => movie.genre === genre).slice(0, count);
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre
  }),

  setShowedFilms: (genre, allMovies) => {
    return {
      type: ActionType.SET_SHOWED_FILMS,
      payload: getMoviesByGenre(genre, allMovies, SHOWED_MOVIES_ON_START_COUNT),
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return extend(state, {
        genre: action.payload
      });
    case ActionType.SET_SHOWED_FILMS:
      return extend(state, {
        showedMovies: action.payload
      });
  }
  return state;
};

export {ActionCreator, ActionType, reducer};
