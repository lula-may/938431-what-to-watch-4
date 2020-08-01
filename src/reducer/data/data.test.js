import {ActionCreator, ActionType, Operation, reducer} from "./data.js";
import MockAdapter from "axios-mock-adapter";
import {reviews, testMovies} from "../../test-mocks/test-films.js";
import {createApi} from "../../api.js";
import {adaptMovie, adaptMovies, adaptComments} from "../../adapter.js";

const movie = testMovies[0];
describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      activeMovie: {},
      comments: [],
      favoriteMovies: [],
      genre: `All genres`,
      hasUploadingError: false,
      hasLoadingError: false,
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

  it(`should update comments when load comments action supplied`, () => {
    expect(reducer({
      comments: [],
    }, {
      type: ActionType.LOAD_COMMENTS,
      payload: reviews,
    })).toEqual({
      comments: reviews,
    });
  });

  it(`should set isLoading: true when start loading action supplied`, () => {
    expect(reducer({
      movies: [],
      isLoading: false,
      hasLoadingError: false,
    }, {
      type: ActionType.START_LOADING,
    })).toEqual({
      movies: [],
      isLoading: true,
      hasLoadingError: false,
    });
  });

  it(`should set isLoading: false when end loading action supplied`, () => {
    expect(reducer({
      movies: [],
      isLoading: true,
      hasLoadingError: false,
    }, {
      type: ActionType.END_LOADING,
    })).toEqual({
      movies: [],
      isLoading: false,
      hasLoadingError: false,
    });
  });

  it(`should set loading error when set error action supplied`, () => {
    expect(reducer({
      movies: [],
      isLoading: false,
      hasLoadingError: false,
    }, {
      type: ActionType.SET_LOADING_ERROR,
      payload: true,
    })).toEqual({
      movies: [],
      isLoading: false,
      hasLoadingError: true,
    });
  });

  it(`should set isUploading: true when start uploading action supplied`, () => {
    expect(reducer({
      movies: [],
      isUploading: false,
      hasUploadingError: false,
    }, {
      type: ActionType.START_UPLOADING,
    })).toEqual({
      movies: [],
      isUploading: true,
      hasUploadingError: false,
    });
  });

  it(`should set isUploading: false when end uploading action supplied`, () => {
    expect(reducer({
      movies: [],
      isUploading: true,
      hasUploadingError: false,
    }, {
      type: ActionType.END_UPLOADING,
    })).toEqual({
      movies: [],
      isUploading: false,
      hasUploadingError: false,
    });
  });

  it(`should set comment uploading error when set comment uploading error action supplied`, () => {
    expect(reducer({
      movies: [],
      isLoading: false,
      hasLoadingError: false,
      hasUploadingError: false,
    }, {
      type: ActionType.SET_UPLOADING_ERROR,
      payload: true,
    })).toEqual({
      movies: [],
      isLoading: false,
      hasLoadingError: false,
      hasUploadingError: true,
    });
  });

  it(`should set movie comments`, () => {
    expect(reducer({
      activeMovie: testMovies[1],
      comments: [],
      movies: [],
      isLoading: false,
      hasLoadingError: false,
      hasUploadingError: false,
    }, {
      type: ActionType.SET_MOVIE_COMMENTS,
      payload: reviews,
    })).toEqual({
      activeMovie: testMovies[1],
      comments: reviews,
      movies: [],
      isLoading: false,
      hasLoadingError: false,
      hasUploadingError: false,
    });
  });

  it(`should set favorite movies when loadFavoriteMovies action supplied`, () => {
    expect(reducer({
      activeMovie: testMovies[1],
      comments: [],
      favoriteMovies: [],
      movies: [],
      isLoading: false,
      hasLoadingError: false,
      hasUploadingError: false,
    }, {
      type: ActionType.LOAD_FAVORITE_MOVIES,
      payload: testMovies,
    })).toEqual({
      activeMovie: testMovies[1],
      comments: [],
      favoriteMovies: testMovies,
      movies: [],
      isLoading: false,
      hasLoadingError: false,
      hasUploadingError: false,
    });
  });

  it(`should set genre when set genre action supplied`, () => {
    expect(reducer({
      genre: `All movies`,
      movies: [],
      isLoading: false,
      hasLoadingError: false,
    }, {
      type: ActionType.SET_GENRE,
      payload: `Crime`,
    })).toEqual({
      genre: `Crime`,
      movies: [],
      isLoading: false,
      hasLoadingError: false,
    });
  });

  it(`should set active movie when set active movie action supplied`, () => {
    expect(reducer({
      genre: `All movies`,
      activeMovie: {},
      movies: [],
      isLoading: false,
      hasLoadingError: false,
    }, {
      type: ActionType.SET_ACTIVE_MOVIE,
      payload: testMovies[2],
    })).toEqual({
      genre: `All movies`,
      activeMovie: testMovies[2],
      movies: [],
      isLoading: false,
      hasLoadingError: false,
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

  it(`should return correct action for comments loading`, () => {
    expect(ActionCreator.loadComments(reviews)).toEqual({
      type: ActionType.LOAD_COMMENTS,
      payload: reviews,
    });
  });

  it(`should return correct action for favorite movies loading`, () => {
    expect(ActionCreator.loadFavoriteMovies(testMovies)).toEqual({
      type: ActionType.LOAD_FAVORITE_MOVIES,
      payload: testMovies,
    });
  });

  it(`should return correct action for promo movie loading`, () => {
    expect(ActionCreator.loadPromo(movie)).toEqual({
      type: ActionType.LOAD_PROMO,
      payload: movie,
    });
  });

  it(`should return correct action for activeMovie setting`, () => {
    expect(ActionCreator.setActiveMovie(2)).toEqual({
      type: ActionType.SET_ACTIVE_MOVIE,
      payload: 2,
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
    expect(ActionCreator.setLoadingError(true)).toEqual({
      type: ActionType.SET_LOADING_ERROR,
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
    expect(ActionCreator.setUploadingError(true)).toEqual({
      type: ActionType.SET_UPLOADING_ERROR,
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

    const movieAnswer = {
      "id": 1,
      "name": `The Grand Budapest Hotel`,
      "poster_image": `img/the-grand-budapest-hotel-poster.jpg`,
      "preview_image": `img/the-grand-budapest-hotel.jpg`,
      "background_image": `img/the-grand-budapest-hotel-bg.jpg`,
      "background_color": `#ffffff`,
      "video_link": `https://some-link`,
      "preview_video_link": `https://some-link`,
      "description": `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      "rating": 8.9,
      "scores_count": 240,
      "director": `Wes Andreson`,
      "starring": [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
      "run_time": 99,
      "genre": `Comedy`,
      "released": 2014,
      "is_favorite": false
    };

    const adaptedMovieAnswer = adaptMovie(movieAnswer);

    MockApi.onGet(`/films`)
    .reply(200, [{fake: true}]);

    MockApi.onGet(`/films/promo`)
    .reply(200, movieAnswer);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(6);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.START_LOADING,
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.SET_LOADING_ERROR,
          payload: false,
        });
        expect(dispatch.mock.calls[2][0]).toEqual({
          type: ActionType.LOAD_PROMO,
          payload: adaptedMovieAnswer,
        });
        expect(dispatch.mock.calls[3][0]).toEqual({
          type: ActionType.SET_ACTIVE_MOVIE,
          payload: adaptedMovieAnswer,
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

  it(`should catch error on API call to "/films" fail`, () => {
    const api = createApi(() => {});
    const MockApi = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    MockApi.onGet(`/films`)
    .reply(404);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.START_LOADING,
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.SET_LOADING_ERROR,
          payload: false,
        });
        expect(dispatch.mock.calls[2][0]).toEqual({
          type: ActionType.END_LOADING,
        });
        expect(dispatch.mock.calls[3][0]).toEqual({
          type: ActionType.SET_LOADING_ERROR,
          payload: true,
        });
      });
  });

  it(`should make a correct API call to "/comments/:id"`, () => {
    const api = createApi(() => {});
    const MockApi = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = Operation.loadComments(1);

    const commentsAnswer = [{
      "id": 1,
      "user": {
        "id": 4,
        "name": `Kate Muir`
      },
      "rating": 8.9,
      "comment": `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
      "date": `2019-05-08T14:13:56.569Z`
    }];

    MockApi.onGet(`/comments/1`)
    .reply(200, commentsAnswer);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.SET_LOADING_ERROR,
          payload: false,
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.LOAD_COMMENTS,
          payload: adaptComments(commentsAnswer),
        });
      });
  });

  it(`should catch error on API call to "/comments" fail`, () => {
    const api = createApi(() => {});
    const MockApi = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = Operation.loadComments();

    MockApi.onGet(`/comments/1`)
    .reply(404);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.SET_LOADING_ERROR,
          payload: false,
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: ActionType.SET_LOADING_ERROR,
          payload: true,
        });
      });
  });

  it(`should make a correct API call on comment sending`, () => {
    const dispatch = jest.fn();
    const api = createApi(() => {});
    const MockApi = new MockAdapter(api);

    const getState = () => ({
      DATA: {activeMovie: testMovies[1]},
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
      expect(dispatch).toHaveBeenCalledTimes(4);

      expect(dispatch.mock.calls[0][0]).toEqual({
        type: ActionType.START_UPLOADING,
      });

      expect(dispatch.mock.calls[1][0]).toEqual({
        type: ActionType.SET_UPLOADING_ERROR,
        payload: false,
      });

      expect(dispatch.mock.calls[2][0]).toEqual({
        type: ActionType.SET_MOVIE_COMMENTS,
        payload: adaptComments(commentAnswer),
      });
      expect(dispatch.mock.calls[3][0]).toEqual({
        type: ActionType.END_UPLOADING,
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
        type: ActionType.SET_UPLOADING_ERROR,
        payload: false,
      });

      expect(dispatch.mock.calls[2][0]).toEqual({
        type: ActionType.END_UPLOADING,
      });

      expect(dispatch.mock.calls[3][0]).toEqual({
        type: ActionType.SET_UPLOADING_ERROR,
        payload: true,
      });
    });
  });

  it(`should make a correct API call on add to or delete from favorite films`, () => {
    const dispatch = jest.fn();
    const api = createApi(() => {});
    const MockApi = new MockAdapter(api);

    const getState = () => ({
      DATA: {
        favoriteMovies: [{id: 1}, {id: 3}, {id: 5}],
        promoMovie: {id: 1},
        movies: [
          {id: 1, isFavorite: true},
          {id: 2, isFavorite: false},
          {id: 3, isFavorite: true},
          {id: 4, isFavorite: false},
          {id: 5, isFavorite: true},
        ],
      },
    });

    const favoriteUpdater = Operation.updateFavoriteMovies({
      id: 1,
      isFavorite: true,
    });

    const movieAnswer = {
      "id": 1,
      "name": `The Grand Budapest Hotel`,
      "poster_image": `img/the-grand-budapest-hotel-poster.jpg`,
      "preview_image": `img/the-grand-budapest-hotel.jpg`,
      "background_image": `img/the-grand-budapest-hotel-bg.jpg`,
      "background_color": `#ffffff`,
      "video_link": `https://some-link`,
      "preview_video_link": `https://some-link`,
      "description": `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      "rating": 8.9,
      "scores_count": 240,
      "director": `Wes Andreson`,
      "starring": [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
      "run_time": 99,
      "genre": `Comedy`,
      "released": 2014,
      "is_favorite": false
    };

    const adaptedMovieAnswer = adaptMovie(movieAnswer);

    MockApi.onPost(`/favorite/1/0`)
    .reply(200, movieAnswer);

    return favoriteUpdater(dispatch, getState, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(7);

      expect(dispatch.mock.calls[0][0]).toEqual({
        type: ActionType.START_UPLOADING,
      });

      expect(dispatch.mock.calls[1][0]).toEqual({
        type: ActionType.SET_UPLOADING_ERROR,
        payload: false,
      });

      expect(dispatch.mock.calls[2][0]).toEqual({
        type: ActionType.END_UPLOADING,
      });

      expect(dispatch.mock.calls[3][0]).toEqual({
        type: ActionType.LOAD_PROMO,
        payload: adaptedMovieAnswer,
      });

      expect(dispatch.mock.calls[4][0]).toEqual({
        type: ActionType.SET_ACTIVE_MOVIE,
        payload: adaptedMovieAnswer,
      });

      expect(dispatch.mock.calls[5][0]).toEqual({
        type: ActionType.LOAD_MOVIES,
        payload: [
          adaptedMovieAnswer,
          {id: 2, isFavorite: false},
          {id: 3, isFavorite: true},
          {id: 4, isFavorite: false},
          {id: 5, isFavorite: true},
        ],
      });

      expect(dispatch.mock.calls[6][0]).toEqual({
        type: ActionType.LOAD_FAVORITE_MOVIES,
        payload: [
          {id: 3, isFavorite: true},
          {id: 5, isFavorite: true},
        ],
      });
    });
  });

  it(`should pass a correct action when add to favoriteList post call failed`, () => {
    const dispatch = jest.fn();
    const api = createApi(() => {});
    const MockApi = new MockAdapter(api);

    const getState = () => ({
      DATA: {
        favoriteMovies: [{id: 1}, {id: 3}, {id: 5}],
        promoMovie: {id: 1},
      },
    });

    const favoriteUpdater = Operation.updateFavoriteMovies({
      id: 1,
      isFavorite: true,
    });

    MockApi.onPost(`/favorite/1/0`)
    .reply(400);

    return favoriteUpdater(dispatch, getState, api)
    .then((response) => response)
    .catch(() => {
      expect(dispatch).toHaveBeenCalledTimes(4);

      expect(dispatch.mock.calls[0][0]).toEqual({
        type: ActionType.START_UPLOADING,
      });

      expect(dispatch.mock.calls[1][0]).toEqual({
        type: ActionType.SET_UPLOADING_ERROR,
        payload: false,
      });

      expect(dispatch.mock.calls[2][0]).toEqual({
        type: ActionType.SET_UPLOADING_ERROR,
        payload: true,
      });

      expect(dispatch.mock.calls[3][0]).toEqual({
        type: ActionType.END_UPLOADING,
      });
    });
  });

});
