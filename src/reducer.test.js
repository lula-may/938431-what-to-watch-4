import {ActionType, reducer, ActionCreator} from "./reducer.js";
import {movies} from "./mocks/films.js";

describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
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
});

describe(`ActionCreator`, () => {
  it(`should return correct action for genre setup`, () => {
    expect(ActionCreator.setGenre(`Drama`)).toEqual({
      type: ActionType.SET_GENRE,
      payload: `Drama`,
    });
  });
});
