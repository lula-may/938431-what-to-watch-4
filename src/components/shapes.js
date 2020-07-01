import PropTypes from "prop-types";

const movieShape = {
  actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  bigPoster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  description: PropTypes.shape({
    paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  director: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  poster: PropTypes.string.isRequired,
  rating: PropTypes.shape({
    count: PropTypes.number.isRequired,
    score: PropTypes.string.isRequired
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

export {movieShape, videoPlayerShape};
