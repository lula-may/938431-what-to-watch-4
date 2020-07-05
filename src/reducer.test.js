import {ActionType, reducer, ActionCreator} from "./reducer.js";
import {movies} from "./mocks/films.js";

describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      allMovies: movies,
      genre: `All genres`,
      showedMovies: movies,
    });
  });

  it(`should set genre "Comedy" when action SET_GENRE with value "Comedy" passed`, () => {
    expect(reducer({
      allMovies: movies,
      genre: `All genres`,
      showedMovies: movies,
    }, {
      type: ActionType.SET_GENRE,
      payload: `Comedy`,
    }
    )).toEqual({
      allMovies: movies,
      genre: `Comedy`,
      showedMovies: movies,
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

  it(`should set all movies as showedMovies`, () => {
    expect(reducer({
      allMovies: movies,
      genre: `Crime`,
      showedMovies: crimeMovies,
    }, {
      type: ActionType.SET_SHOWED_FILMS,
      payload: movies,
    }
    )).toEqual({
      allMovies: movies,
      genre: `Crime`,
      showedMovies: movies,
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
    const dramaMovies = movies.filter((movie) => movie.genre === `Drama`);

    expect(ActionCreator.setShowedFilms(`Drama`, movies)).toEqual({
      type: ActionType.SET_SHOWED_FILMS,
      payload: dramaMovies,
    });
  });
});
