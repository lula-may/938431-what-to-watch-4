import PropTypes from "prop-types";
const reviewShape = {
  author: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

const movieShape = {
  actors: PropTypes.arrayOf(PropTypes.string),
  bgColor: PropTypes.string,
  bgPoster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  poster: PropTypes.string.isRequired,
  previewPoster: PropTypes.string.isRequired,
  rating: PropTypes.shape({
    count: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  releaseYear: PropTypes.number.isRequired,
  runTime: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

const videoPlayerShape = {
  areControlsShown: PropTypes.bool.isRequired,
  height: PropTypes.string.isRequired,
  isMuted: PropTypes.bool.isRequired,
  width: PropTypes.string.isRequired,
};

export {movieShape, reviewShape, videoPlayerShape};
