import NameSpace from "../name-space.js";
import {createSelector} from "reselect";

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].authorizationStatus;
};

export const getAvatarUrl = (state) => {
  return state[NAME_SPACE].avatarUrl;
};

export const getLoginErrorStatus = (state) => {
  return state[NAME_SPACE].hasLoginError;
};

const getLoginError = (state) => {
  return state[NAME_SPACE].loginError;
};

export const getEmailValidity = createSelector(
    getLoginError,
    (err) => Boolean(err && err.response && err.response.status === 400)
);
