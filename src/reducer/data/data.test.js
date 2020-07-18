import {ActionCreator, ActionType, Operation, reducer} from "./data.js";
import MockAdapter from "axios-mock-adapter";
import {movies} from "../../mocks/films.js";
import { createApi } from "../../api.js";

describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      error: undefined,
      hasErrors: false,
      isLoading: false,
      movies: [],
    });
  });

  it(`should update movies when load movies action supplied`, () => {
    expect(reducer({
      movies: [],
    }, {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    })).toEqual({
      movies,
    });
  });

  it(`should set isLoading: true when start loading action supplied`, () => {
    expect(reducer({
      movies: [],
      isLoading: false,
      hasErrors: false,
      error: undefined,
    }, {
      type: ActionType.START_LOADING,
      payload: null,
    })).toEqual({
      movies: [],
      isLoading: true,
      hasErrors: false,
      error: undefined,
    });
  });

  it(`should set isLoading: false when end loading action supplied`, () => {
    expect(reducer({
      movies: [],
      isLoading: true,
      hasErrors: false,
      error: undefined,
    }, {
      type: ActionType.END_LOADING,
      payload: null,
    })).toEqual({
      movies: [],
      isLoading: false,
      hasErrors: false,
      error: undefined,
    });
  });

  it(`should set error when set error action supplied`, () => {
    expect(reducer({
      movies: [],
      isLoading: false,
      hasErrors: false,
      error: undefined,
    }, {
      type: ActionType.SET_ERROR,
      payload: `error message`,
    })).toEqual({
      movies: [],
      isLoading: false,
      hasErrors: true,
      error: `error message`,
    });
  });
});

describe(`ActionCreator`, () => {
  it(`should return correct action for movies loading`, () => {
    expect(ActionCreator.loadMovies(movies)).toEqual({
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    });
  });

  it(`should return correct action for start loading`, () => {
    expect(ActionCreator.startLoading()).toEqual({
      type: ActionType.START_LOADING,
      payload: null,
    });
  });

  it(`should return correct action for end loading`, () => {
    expect(ActionCreator.endLoading()).toEqual({
      type: ActionType.END_LOADING,
      payload: null,
    });
  });

  it(`should return correct action for error setting`, () => {
    const error = {
      message: `error message`,
    };
    expect(ActionCreator.setError(error)).toEqual({
      type: ActionType.SET_ERROR,
      payload: `error message`,
    });
  });
});

describe(`Operation`, () => {
  it(`should make a correct API call to "/movies"`, () => {
    const api = createApi(() => {});
    const MockApi = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    MockApi.onGet(`/films`)
    .reply(200, [{fake: true}]);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.START_LOADING,
          payload: null,
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.LOAD_MOVIES,
          payload: [{fake: true}],
        });
        expect(dispatch.mock.calls[2][0]).toEqual({
          type: ActionType.END_LOADING,
          payload: null,
        });
      });
  });

  it(`should catch error on API call fail`, () => {
    const api = createApi(() => {});
    const MockApi = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    MockApi.onGet(`/questions`)
    .reply(404);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.START_LOADING,
          payload: null,
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.END_LOADING,
          payload: null,
        });
        expect(dispatch.mock.calls[2][0]).toEqual({
          type: ActionType.SET_ERROR,
          payload: `Request failed with status code 404`,
        });
      });
  });
});
