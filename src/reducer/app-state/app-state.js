import {extend} from "../../utils.js";
import {Page, SHOWED_MOVIES_ON_START_COUNT} from "../../const.js";

const initialState = {
  moviesCount: SHOWED_MOVIES_ON_START_COUNT,
  page: Page.MAIN,
  previousPage: undefined,
};

const ActionType = {
  INCREMENT_MOVIES_COUNT: `INCREMENT_MOVIES_COUNT`,
  RESET_COUNT: `RESET_COUNT`,
  RETURN_TO_PREVIOUS_PAGE: `RETURN_TO_PREVIOUS_PAGE`,
  SAVE_CURRENT_PAGE: `SAVE_CURRENT_PAGE`,
  SET_PAGE: `SET_PAGE`,
};

const ActionCreator = {
  setPage: (page) => ({
    type: ActionType.SET_PAGE,
    payload: page,
  }),

  saveCurrentPage: () => ({
    type: ActionType.SAVE_CURRENT_PAGE,
  }),

  returnToPreviousPage: () => ({
    type: ActionType.RETURN_TO_PREVIOUS_PAGE,
  }),

  incrementMoviesCount: () => ({
    type: ActionType.INCREMENT_MOVIES_COUNT,
    payload: SHOWED_MOVIES_ON_START_COUNT
  }),

  resetCount: () => ({
    type: ActionType.RESET_COUNT,
    payload: null,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_PAGE:
      return extend(state, {
        page: action.payload,
      });
    case ActionType.INCREMENT_MOVIES_COUNT:
      return extend(state, {
        moviesCount: state.moviesCount + action.payload,
      });
    case ActionType.RESET_COUNT:
      return extend(state, {
        moviesCount: SHOWED_MOVIES_ON_START_COUNT,
      });
    case ActionType.SAVE_CURRENT_PAGE:
      return extend(state, {
        previousPage: state.page,
      });
    case ActionType.RETURN_TO_PREVIOUS_PAGE:
      return extend(state, {
        page: state.previousPage,
        previousPage: undefined,
      });
  }
  return state;
};

export {ActionCreator, ActionType, reducer};
