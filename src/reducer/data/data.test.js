import {ActionCreator, ActionType, Operation, reducer} from "./data.js";
import MockAdapter from "axios-mock-adapter";
import {testMovies} from "../../test-mocks/test-films.js";
import {createApi} from "../../api.js";
import {adaptMovie, adaptMovies} from "../../adapter.js";

const movie = testMovies[0];

describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      activeMovie: {},
      genre: `All genres`,
      hasErrors: false,
      isLoading: false,
      movies: [],
      promoMovie: {},
    });
  });

  it(`should update movies when load movies action supplied`, () => {
    expect(reducer({
      movies: [],
    }, {
      type: ActionType.LOAD_MOVIES,
      payload: testMovies,
    })).toEqual({
      movies: testMovies,
    });
  });

  it(`should set isLoading: true when start loading action supplied`, () => {
    expect(reducer({
      movies: [],
      isLoading: false,
      hasErrors: false,
    }, {
      type: ActionType.START_LOADING,
    })).toEqual({
      movies: [],
      isLoading: true,
      hasErrors: false,
    });
  });

  it(`should set isLoading: false when end loading action supplied`, () => {
    expect(reducer({
      movies: [],
      isLoading: true,
      hasErrors: false,
    }, {
      type: ActionType.END_LOADING,
    })).toEqual({
      movies: [],
      isLoading: false,
      hasErrors: false,
    });
  });

  it(`should set error when set error action supplied`, () => {
    expect(reducer({
      movies: [],
      isLoading: false,
      hasErrors: false,
    }, {
      type: ActionType.SET_ERROR,
      payload: true,
    })).toEqual({
      movies: [],
      isLoading: false,
      hasErrors: true,
    });
  });

  it(`should set genre when set genre action supplied`, () => {
    expect(reducer({
      genre: `All movies`,
      movies: [],
      isLoading: false,
      hasErrors: false,
    }, {
      type: ActionType.SET_GENRE,
      payload: `Crime`,
    })).toEqual({
      genre: `Crime`,
      movies: [],
      isLoading: false,
      hasErrors: false,
    });
  });

  it(`should set active movie when set active movie action supplied`, () => {
    expect(reducer({
      genre: `All movies`,
      activeMovie: {},
      movies: [],
      isLoading: false,
      hasErrors: false,
    }, {
      type: ActionType.SET_ACTIVE_MOVIE,
      payload: movie,
    })).toEqual({
      genre: `All movies`,
      activeMovie: movie,
      movies: [],
      isLoading: false,
      hasErrors: false,
    });
  });

});

describe(`ActionCreator`, () => {
  it(`should return correct action for movies loading`, () => {
    expect(ActionCreator.loadMovies(testMovies)).toEqual({
      type: ActionType.LOAD_MOVIES,
      payload: testMovies,
    });
  });

  it(`should return correct action for promo movie loading`, () => {
    expect(ActionCreator.loadPromo(movie)).toEqual({
      type: ActionType.LOAD_PROMO,
      payload: movie,
    });
  });


  it(`should return correct action for start loading`, () => {
    expect(ActionCreator.startLoading()).toEqual({
      type: ActionType.START_LOADING,
    });
  });

  it(`should return correct action for end loading`, () => {
    expect(ActionCreator.endLoading()).toEqual({
      type: ActionType.END_LOADING,
    });
  });

  it(`should return correct action for error setting`, () => {
    expect(ActionCreator.setError(true)).toEqual({
      type: ActionType.SET_ERROR,
      payload: true,
    });
  });
});

describe(`Operation`, () => {
  it(`should make a correct API call to "/movies"`, () => {
    const api = createApi(() => {});
    const MockApi = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    window.adaptMovie = (item) => item;

    MockApi.onGet(`/films`)
    .reply(200, [{fake: true}]);

    MockApi.onGet(`/films/promo`)
    .reply(200, [{fake: true}]);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(6);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.START_LOADING,
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.SET_ERROR,
          payload: false,
        });
        expect(dispatch.mock.calls[2][0]).toEqual({
          type: ActionType.LOAD_PROMO,
          payload: adaptMovie({fake: true}),
        });
        expect(dispatch.mock.calls[3][0]).toEqual({
          type: ActionType.SET_ACTIVE_MOVIE,
          payload: adaptMovie({fake: true}),
        });
        expect(dispatch.mock.calls[4][0]).toEqual({
          type: ActionType.LOAD_MOVIES,
          payload: adaptMovies([{fake: true}]),
        });
        expect(dispatch.mock.calls[5][0]).toEqual({
          type: ActionType.END_LOADING,
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
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.START_LOADING,
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.SET_ERROR,
          payload: false,
        });
        expect(dispatch.mock.calls[2][0]).toEqual({
          type: ActionType.END_LOADING,
        });
        expect(dispatch.mock.calls[3][0]).toEqual({
          type: ActionType.SET_ERROR,
          payload: true,
        });
      });
  });
});
