import {ActionType, reducer, ActionCreator} from "./app-state.js";

describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      moviesCount: 8,
      page: `main`,
      previousPage: undefined,
    });
  });

  it(`should set DetailsPage when action SET_PAGE with value "details" passed`, () => {
    expect(reducer({
      page: `main`,
      moviesCount: 8,
      previousPage: undefined,
    }, {
      type: ActionType.SET_PAGE,
      payload: `details`,
    }
    )).toEqual({
      page: `details`,
      moviesCount: 8,
      previousPage: undefined,
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

  it(`should save current page to previous page when action SAVE_CURRENT_PAGE passed`, () => {
    expect(reducer({
      moviesCount: 8,
      page: `details`,
      previousPage: undefined,
    }, {
      type: ActionType.SAVE_CURRENT_PAGE,
    })).toEqual({
      moviesCount: 8,
      page: `details`,
      previousPage: `details`,
    });
  });

  it(`should pass previous page to current page when action RETURN_PREVIOUS_PAGE passed`, () => {
    expect(reducer({
      moviesCount: 8,
      page: `player`,
      previousPage: `details`,
    }, {
      type: ActionType.RETURN_TO_PREVIOUS_PAGE,
    })).toEqual({
      moviesCount: 8,
      page: `details`,
      previousPage: undefined,
    });
  });

});

describe(`ActionCreator`, () => {
  it(`should return correct action for page setup`, () => {
    expect(ActionCreator.setPage(`details`)).toEqual({
      type: ActionType.SET_PAGE,
      payload: `details`,
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

  it(`should return correct action for saving current page`, () => {
    expect(ActionCreator.saveCurrentPage()).toEqual({
      type: ActionType.SAVE_CURRENT_PAGE,
    });
  });

  it(`should return correct action for going back to previous page`, () => {
    expect(ActionCreator.returnToPreviousPage()).toEqual({
      type: ActionType.RETURN_TO_PREVIOUS_PAGE,
    });
  });
});
