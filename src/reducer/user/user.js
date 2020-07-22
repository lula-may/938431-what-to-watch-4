import {extend} from "../../utils.js";

const BASE_URL = `https://4.react.pages.academy`;
const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  avatarUrl: ``,
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  SET_AVATAR_URL: `SET_AVATAR_URL`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: status,
    };
  },

  setAvatarUrl: (url) => {
    return {
      type: ActionType.SET_AVATAR_URL,
      payload: url,
    };
  }
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
    .then((response) => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      const avatarUrl = `${BASE_URL}${response.data[`avatar_url`]}`;
      dispatch(ActionCreator.setAvatarUrl(avatarUrl));
    })
    .catch((err) => err);
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.SET_AVATAR_URL:
      return extend(state, {
        avatarUrl: action.payload,
      });
  }
  return state;
};

export {ActionType, ActionCreator, AuthorizationStatus, Operation, reducer};
