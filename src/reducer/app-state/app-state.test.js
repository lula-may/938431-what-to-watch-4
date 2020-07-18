import {ActionType, reducer, ActionCreator} from "./app-state.js";

describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      moviesCount: 8,
      genre: `All genres`,
    });
  });

  it(`should set genre "Comedy" when action SET_GENRE with value "Comedy" passed`, () => {
    expect(reducer({
      genre: `All genres`,
      moviesCount: 8,
    }, {
      type: ActionType.SET_GENRE,
      payload: `Comedy`,
    }
    )).toEqual({
      genre: `Comedy`,
      moviesCount: 8,
    });
  });

  it(`should set count to 10`, () => {
    expect(reducer({
      moviesCount: 2,
      genre: `Sport`,
    }, {
      type: ActionType.INCREMENT_MOVIES_COUNT,
      payload: 8,
    }
    )).toEqual({
      moviesCount: 10,
      genre: `Sport`,
    });
  });

  it(`should set count to initialState when action "RESET_COUNT" passed`, () => {
    expect(reducer({
      moviesCount: 20,
      genre: `Sport`,
    }, {
      type: ActionType.RESET_COUNT,
    })).toEqual({
      moviesCount: 8,
      genre: `Sport`,
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
});
