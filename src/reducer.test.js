import {ActionType, reducer, ActionCreator} from "./reducer.js";
import {movies} from "./mocks/films.js";

const showedMovies = movies.slice(0, 8);

describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      allMovies: movies,
      genre: `All genres`,
      showedMovies,
    });
  });

  it(`should set genre "Comedy" when action SET_GENRE with value "Comedy" passed`, () => {
    expect(reducer({
      allMovies: movies,
      genre: `All genres`,
      showedMovies,
    }, {
      type: ActionType.SET_GENRE,
      payload: `Comedy`,
    }
    )).toEqual({
      allMovies: movies,
      genre: `Comedy`,
      showedMovies,
    });
  });

  const crimeMovies = movies.filter((movie) => movie.genre === `Crime`).slice(0, 8);

  it(`should set Crime movies as showedMovies`, () => {
    expect(reducer({
      allMovies: movies,
      genre: `All genres`,
      showedMovies: movies,
    }, {
      type: ActionType.SET_SHOWED_FILMS,
      payload: crimeMovies,
    }
    )).toEqual({
      allMovies: movies,
      genre: `All genres`,
      showedMovies: crimeMovies,
    });
  });
});

describe(`ActionCreator`, () => {
  it(`should return correct action for genre setup`, () => {
    expect(ActionCreator.setGenre(`Drama`)).toEqual({
      type: ActionType.SET_GENRE,
      payload: `Drama`,
    });
  });

  it(`should return correct action for showedFilms to be set Crime films`, () => {
    const dramaMovies = movies.filter((movie) => movie.genre === `Drama`).slice(0, 8);

    expect(ActionCreator.setShowedFilms(`Drama`, movies)).toEqual({
      type: ActionType.SET_SHOWED_FILMS,
      payload: dramaMovies,
    });
  });

  it(`should return correct action for showedFilms to be set "All genres" films`, () => {

    expect(ActionCreator.setShowedFilms(`All genres`, movies)).toEqual({
      type: ActionType.SET_SHOWED_FILMS,
      payload: showedMovies,
    });
  });
});
