import {ActionType, reducer, ActionCreator} from "./reducer.js";
import {movies} from "./mocks/films.js";

describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      count: 8,
      movies,
      genre: `All genres`,
    });
  });

  it(`should set genre "Comedy" when action SET_GENRE with value "Comedy" passed`, () => {
    expect(reducer({
      movies,
      genre: `All genres`,
    }, {
      type: ActionType.SET_GENRE,
      payload: `Comedy`,
    }
    )).toEqual({
      movies,
      genre: `Comedy`,
    });
  });

  it(`should set count to 10`, () => {
    expect(reducer({
      count: 2,
      movies,
      genre: `Sport`,
    }, {
      type: ActionType.INCREMENT_COUNT,
      payload: 8,
    }
    )).toEqual({
      count: 10,
      movies,
      genre: `Sport`,
    });
  });

  it(`should set count to initialState when action "RESET_COUNT" passed`, () => {
    expect(reducer({
      count: 20,
      movies,
      genre: `Sport`,
    }, {
      type: ActionType.RESET_COUNT,
    })).toEqual({
      count: 8,
      movies,
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
    expect(ActionCreator.incrementCount()).toEqual({
      type: ActionType.INCREMENT_COUNT,
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
