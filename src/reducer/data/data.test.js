import {ActionCreator, ActionType, Operation, reducer} from "./data.js";
import MockAdapter from "axios-mock-adapter";
import {reviews, testMovies} from "../../test-mocks/test-films.js";
import {createApi} from "../../api.js";
import {adaptMovie, adaptMovies, adaptComments} from "../../adapter.js";
import {ActionType as StateActionType} from "../app-state/app-state.js";

const movie = testMovies[0];
describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      activeMovie: {},
      comments: [],
      genre: `All genres`,
      hasCommentUploadingError: false,
      hasFilmsLoadingError: false,
      isLoading: false,
      isUploading: false,
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
      hasFilmsLoadingError: false,
    }, {
      type: ActionType.START_LOADING,
    })).toEqual({
      movies: [],
      isLoading: true,
      hasFilmsLoadingError: false,
    });
  });

  it(`should set isLoading: false when end loading action supplied`, () => {
    expect(reducer({
      movies: [],
      isLoading: true,
      hasFilmsLoadingError: false,
    }, {
      type: ActionType.END_LOADING,
    })).toEqual({
      movies: [],
      isLoading: false,
      hasFilmsLoadingError: false,
    });
  });

  it(`should set movies loading error when set error action supplied`, () => {
    expect(reducer({
      movies: [],
      isLoading: false,
      hasFilmsLoadingError: false,
    }, {
      type: ActionType.SET_FILMS_LOADING_ERROR,
      payload: true,
    })).toEqual({
      movies: [],
      isLoading: false,
      hasFilmsLoadingError: true,
    });
  });

  it(`should set isUploading: true when start uploading action supplied`, () => {
    expect(reducer({
      movies: [],
      isUploading: false,
      hasCommentUploadingError: false,
    }, {
      type: ActionType.START_UPLOADING,
    })).toEqual({
      movies: [],
      isUploading: true,
      hasCommentUploadingError: false,
    });
  });

  it(`should set isUploading: false when end uploading action supplied`, () => {
    expect(reducer({
      movies: [],
      isUploading: true,
      hasCommentUploadingError: false,
    }, {
      type: ActionType.END_UPLOADING,
    })).toEqual({
      movies: [],
      isUploading: false,
      hasCommentUploadingError: false,
    });
  });

  it(`should set comment uploading error when set comment uploading error action supplied`, () => {
    expect(reducer({
      movies: [],
      isLoading: false,
      hasFilmsLoadingError: false,
      hasCommentUploadingError: false,
    }, {
      type: ActionType.SET_COMMENT_UPLOADING_ERROR,
      payload: true,
    })).toEqual({
      movies: [],
      isLoading: false,
      hasFilmsLoadingError: false,
      hasCommentUploadingError: true,
    });
  });

  it(`should set comments when set comments action supplied`, () => {
    expect(reducer({
      activeMovie: movie,
      comments: [],
      movies: [],
      isLoading: false,
      hasFilmsLoadingError: false,
      hasCommentUploadingError: false,
    }, {
      type: ActionType.SET_MOVIE_COMMENTS,
      payload: reviews,
    })).toEqual({
      activeMovie: movie,
      comments: reviews,
      movies: [],
      isLoading: false,
      hasFilmsLoadingError: false,
      hasCommentUploadingError: false,
    });
  });


  it(`should set genre when set genre action supplied`, () => {
    expect(reducer({
      genre: `All movies`,
      movies: [],
      isLoading: false,
      hasFilmsLoadingError: false,
    }, {
      type: ActionType.SET_GENRE,
      payload: `Crime`,
    })).toEqual({
      genre: `Crime`,
      movies: [],
      isLoading: false,
      hasFilmsLoadingError: false,
    });
  });

  it(`should set active movie when set active movie action supplied`, () => {
    expect(reducer({
      genre: `All movies`,
      activeMovie: {},
      movies: [],
      isLoading: false,
      hasFilmsLoadingError: false,
    }, {
      type: ActionType.SET_ACTIVE_MOVIE,
      payload: movie,
    })).toEqual({
      genre: `All movies`,
      activeMovie: movie,
      movies: [],
      isLoading: false,
      hasFilmsLoadingError: false,
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

  it(`should return correct action for movies loading error setting`, () => {
    expect(ActionCreator.setFilmsLoadingError(true)).toEqual({
      type: ActionType.SET_FILMS_LOADING_ERROR,
      payload: true,
    });
  });

  it(`should return correct action for start comment uploading`, () => {
    expect(ActionCreator.startUploading()).toEqual({
      type: ActionType.START_UPLOADING,
    });
  });

  it(`should return correct action for end loading`, () => {
    expect(ActionCreator.endUploading()).toEqual({
      type: ActionType.END_UPLOADING,
    });
  });

  it(`should return correct action for comment uploading error setting`, () => {
    expect(ActionCreator.setCommentUploadingError(true)).toEqual({
      type: ActionType.SET_COMMENT_UPLOADING_ERROR,
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
          type: ActionType.SET_FILMS_LOADING_ERROR,
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
          type: ActionType.SET_FILMS_LOADING_ERROR,
          payload: false,
        });
        expect(dispatch.mock.calls[2][0]).toEqual({
          type: ActionType.END_LOADING,
        });
        expect(dispatch.mock.calls[3][0]).toEqual({
          type: ActionType.SET_FILMS_LOADING_ERROR,
          payload: true,
        });
      });
  });

  it(`should make a correct API call on comment sending`, () => {
    const dispatch = jest.fn();
    const api = createApi(() => {});
    const MockApi = new MockAdapter(api);

    const getState = () => ({
      DATA: {
        activeMovie: {id: 1},
      },
    });

    const commentUploader = Operation.postComment({
      rating: 4,
      comment: `This is the house that Jack built. And this is the malt that lay in the house that Jack built.`,
    });

    const commentAnswer = [{
      "id": 1,
      "user": {
        "id": 4,
        "name": `Kate Muir`
      },
      "rating": 8.9,
      "comment": `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
      "date": `2019-05-08T14:13:56.569Z`
    }];

    MockApi.onPost(`/comments/1`)
    .reply(200, commentAnswer);

    return commentUploader(dispatch, getState, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(5);

      expect(dispatch.mock.calls[0][0]).toEqual({
        type: ActionType.START_UPLOADING,
      });

      expect(dispatch.mock.calls[1][0]).toEqual({
        type: ActionType.SET_COMMENT_UPLOADING_ERROR,
        payload: false,
      });

      expect(dispatch.mock.calls[2][0]).toEqual({
        type: ActionType.SET_MOVIE_COMMENTS,
        payload: adaptComments(commentAnswer),
      });
      expect(dispatch.mock.calls[3][0]).toEqual({
        type: ActionType.END_UPLOADING,
      });
      expect(dispatch.mock.calls[4][0]).toEqual({
        type: StateActionType.SET_PAGE,
        payload: `details`,
      });
    });
  });

  it(`should pass a correct action when comment post call failed`, () => {
    const dispatch = jest.fn();
    const api = createApi(() => {});
    const MockApi = new MockAdapter(api);

    const getState = () => ({
      DATA: {
        activeMovie: {id: 1},
      },
    });

    const commentUploader = Operation.postComment({
      rating: 4,
      comment: `This is the house that Jack built. And this is the malt that lay in the house that Jack built.`,
    });

    MockApi.onPost(`/comments/1`)
    .reply(400);

    return commentUploader(dispatch, getState, api)
    .then((response) => response)
    .catch(() => {
      expect(dispatch).toHaveBeenCalledTimes(4);

      expect(dispatch.mock.calls[0][0]).toEqual({
        type: ActionType.START_UPLOADING,
      });

      expect(dispatch.mock.calls[1][0]).toEqual({
        type: ActionType.SET_COMMENT_UPLOADING_ERROR,
        payload: false,
      });

      expect(dispatch.mock.calls[2][0]).toEqual({
        type: ActionType.END_UPLOADING,
      });

      expect(dispatch.mock.calls[3][0]).toEqual({
        type: ActionType.SET_COMMENT_UPLOADING_ERROR,
        payload: true,
      });
    });
  });
});
