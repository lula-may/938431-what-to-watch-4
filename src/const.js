const PREVIEW = {
  width: `280`,
  height: `175`,
};

const PLAYER_DELAY = 1000;
const SIMILAR_MOVIES_COUNT = 4;
const SHOWED_MOVIES_ON_START_COUNT = 8;
const DEFAULT_GENRE = `All genres`;
const MAX_GENRES_COUNT = 9;
const TEXT_COLOR = `#c9b37e`;

const AppRoute = {
  ROOT: `/`,
  LOGIN: `/login`,
  FILMS: `/films`,
  MY_LIST: `/mylist`,
  NOT_FOUND: `/notfound`,
  PLAYER: `/player`,
  REVIEW: `/review`,
};

export {
  AppRoute,
  DEFAULT_GENRE,
  MAX_GENRES_COUNT,
  PLAYER_DELAY,
  PREVIEW,
  SIMILAR_MOVIES_COUNT,
  SHOWED_MOVIES_ON_START_COUNT,
  TEXT_COLOR
};
