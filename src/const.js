const PREVIEW = {
  width: `280`,
  height: `175`,
};

const PLAYER_DELAY = 1000;
const SIMILAR_MOVIES_COUNT = 4;
const SHOWED_MOVIES_ON_START_COUNT = 8;
const DEFAULT_GENRE = `All genres`;
const MAX_GENRES_COUNT = 9;

const AppRoute = {
  ROOT: `/`,
  LOGIN: `/login`,
  FILM: `/films/:id`,
  MY_LIST: `/mylist`,
  PLAYER: `/films/:id/player`,
  REVIEW: `/films/:id/review`,
};

const TabType = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

export {
  AppRoute,
  DEFAULT_GENRE,
  MAX_GENRES_COUNT,
  PLAYER_DELAY,
  PREVIEW,
  SIMILAR_MOVIES_COUNT,
  SHOWED_MOVIES_ON_START_COUNT,
  TabType};
