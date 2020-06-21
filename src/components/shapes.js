import PropTypes from "prop-types";

const movieShape = {
  actors: PropTypes.string.isRequired,
  bigPoster: PropTypes.string.isRequired,
  descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  director: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  poster: PropTypes.string.isRequired,
  ratingCount: PropTypes.number.isRequired,
  ratingLevel: PropTypes.string.isRequired,
  ratingScore: PropTypes.number.isRequired,
  releaseYear: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export {movieShape};
