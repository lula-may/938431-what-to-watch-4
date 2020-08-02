import {ActionType, reducer, ActionCreator} from "./app-state.js";

describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
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
      page: `main`,
      previousPage: undefined,
    }, {
      type: ActionType.RESET_COUNT,
    })).toEqual({
      moviesCount: 8,
      page: `main`,
      previousPage: undefined,
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
});
