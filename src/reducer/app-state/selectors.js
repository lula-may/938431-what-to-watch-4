import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.APP_STATE;

export const getMoviesCount = (state) => {
  return state[NAME_SPACE].moviesCount;
};

