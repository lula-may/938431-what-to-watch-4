import {ActionType, ActionCreator, AuthorizationStatus, reducer, Operation} from "./user.js";
import MockAdapter from "axios-mock-adapter";
import {createApi} from "../../api.js";

describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      authorizationStatus: `NO_AUTH`,
      avatarUrl: ``,
    });
  });

  it(`should set a given value to authorizationStatus`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH
    }, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: `AUTH`,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH
    }, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    })).toEqual({
      authorizationStatus: `NO_AUTH`,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH
    }, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    })).toEqual({
      authorizationStatus: `NO_AUTH`,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH
    }, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: `AUTH`,
    });
  });

  it(`should set a given url to user avatar`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH,
      avatarUrl: ``,
    }, {
      type: ActionType.SET_AVATAR_URL,
      payload: `picture.jpg`,
    })).toEqual({
      authorizationStatus: `AUTH`,
      avatarUrl: `picture.jpg`,
    });
  });
});

describe(`ActionCreator`, () => {
  it(`should return correct action for authorization require`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });
  });

  it(`should return correct action for setting user avatar url`, () => {
    expect(ActionCreator.setAvatarUrl(`picture.jpg`)).toEqual({
      type: ActionType.SET_AVATAR_URL,
      payload: `picture.jpg`,
    });
  });
});

describe(`Operation`, () => {
  it(`should pass a correct action when user isn't authorized`, () => {
    const dispatch = jest.fn();
    const onUnauthorized = () => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
    };
    const api = createApi(onUnauthorized);
    const MockApi = new MockAdapter(api);
    const authorizationChecker = Operation.checkAuth();

    MockApi.onGet(`/login`)
    .reply(401);

    return authorizationChecker(dispatch, () => {}, api)
    .then((response) => response)
    .catch(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.REQUIRE_AUTHORIZATION,
        payload: `NO_AUTH`,
      });
    });
  });

  it(`should pass a correct action when user is authorized`, () => {
    const dispatch = jest.fn();
    const onUnauthorized = () => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
    };
    const api = createApi(onUnauthorized);
    const MockApi = new MockAdapter(api);
    const authorizationChecker = Operation.checkAuth();

    MockApi.onGet(`/login`)
    .reply(200, {[`avatar_url`]: `/picture.jpg`});

    return authorizationChecker(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: ActionType.REQUIRE_AUTHORIZATION,
        payload: `AUTH`,
      });
      expect(dispatch.mock.calls[1][0]).toEqual({
        type: ActionType.SET_AVATAR_URL,
        payload: `https://4.react.pages.academy/picture.jpg`,
      });
    });
  });

  it(`should make a correct API call on user loged in`, () => {
    const dispatch = jest.fn();
    const api = createApi(() => {});
    const MockApi = new MockAdapter(api);
    const loginMaker = Operation.login({
      email: `email`,
      password: `password`,
    });

    MockApi.onPost(`/login`)
    .reply(200, {[`avatar_url`]: `/picture.jpg`});

    return loginMaker(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: ActionType.REQUIRE_AUTHORIZATION,
        payload: `AUTH`,
      });
      expect(dispatch.mock.calls[1][0]).toEqual({
        type: ActionType.SET_AVATAR_URL,
        payload: `https://4.react.pages.academy/picture.jpg`,
      });
    });
  });
});
