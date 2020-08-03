import {ActionType, reducer, ActionCreator} from "./app-state.js";
import {testMovies} from "../../test-mocks/test-films.js";

describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      activeMovie: {},
      genre: `All genres`,
      moviesCount: 8,
    });
  });

  it(`should set count to 10`, () => {
    expect(reducer({
      moviesCount: 2,
      page: `main`,
      previousPage: undefined,
    }, {
      type: ActionType.INCREMENT_MOVIES_COUNT,
      payload: 8,
    }
    )).toEqual({
      moviesCount: 10,
      page: `main`,
      previousPage: undefined,
    });
  });

  it(`should set count to default State when action "RESET_COUNT" passed`, () => {
    expect(reducer({
      moviesCount: 20,
    }, {
      type: ActionType.RESET_COUNT,
    })).toEqual({
      moviesCount: 8,
    });
  });
  it(`should set genre when set genre action supplied`, () => {
    expect(reducer({
      genre: `All movies`,
    }, {
      type: ActionType.SET_GENRE,
      payload: `Crime`,
    })).toEqual({
      genre: `Crime`,
    });
  });

  it(`should set active movie when set active movie action supplied`, () => {
    expect(reducer({
      genre: `All movies`,
      activeMovie: {},
    }, {
      type: ActionType.SET_ACTIVE_MOVIE,
      payload: testMovies[2],
    })).toEqual({
      genre: `All movies`,
      activeMovie: testMovies[2],
    });
  });
});

describe(`ActionCreator`, () => {
  it(`should return correct action for count increment`, () => {
    expect(ActionCreator.incrementMoviesCount()).toEqual({
      type: ActionType.INCREMENT_MOVIES_COUNT,
      payload: 8,
    });
  });

  it(`should return correct action for count reset`, () => {
    expect(ActionCreator.resetCount()).toEqual({
      type: ActionType.RESET_COUNT,
      payload: null,
    });
  });

  it(`should return correct action for activeMovie setting`, () => {
    expect(ActionCreator.setActiveMovie(2)).toEqual({
      type: ActionType.SET_ACTIVE_MOVIE,
      payload: 2,
    });
  });

  it(`should return correct action for activeMovie reset`, () => {
    expect(ActionCreator.resetActiveMovie()).toEqual({
      type: ActionType.RESET_ACTIVE_MOVIE,
    });
  });

  it(`should return correct action for genre setting`, () => {
    expect(ActionCreator.setGenre(`Crime`)).toEqual({
      type: ActionType.SET_GENRE,
      payload: `Crime`,
    });
  });
});
