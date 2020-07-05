import {extend} from "./utils.js";
import {movies} from "./mocks/films.js";

const DEFAULT_GENRE = `All genres`;


const initialState = {
  allMovies: movies,
  genre: `All genres`,
  showedMovies: movies,
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  SET_SHOWED_FILMS: `SET_SHOWED_FILMS`,
};

const getMoviesByGenre = (genre, allMovies) => {
  if (genre === DEFAULT_GENRE) {
    return allMovies;
  }
  return allMovies.filter((movie) => movie.genre === genre);
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre
  }),

  setShowedFilms: (genre, allMovies) => {
    return {
      type: ActionType.SET_SHOWED_FILMS,
      payload: getMoviesByGenre(genre, allMovies),
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
