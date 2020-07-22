import {ActionType, ActionCreator, AuthorizationStatus, reducer, Operation} from "./user.js";
import MockAdapter from "axios-mock-adapter";
import {createApi} from "../../api.js";

describe(`Reducer`, () => {
  it(`should return initialState when empty parameters supplied`, () => {
    expect(reducer(undefined, {})).toEqual({
      authorizationStatus: `NO_AUTH`,
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
    .reply(200);

    return authorizationChecker(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.REQUIRE_AUTHORIZATION,
        payload: `AUTH`,
      });
    });
  });
});
