import PropTypes from "prop-types";
const reviewShape = {
  author: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  id: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const movieShape = {
  actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  bigPoster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  description: PropTypes.shape({
    paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  director: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  rating: PropTypes.shape({
    count: PropTypes.number.isRequired,
    score: PropTypes.string.isRequired
  }).isRequired,
  releaseYear: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(
      PropTypes.shape(reviewShape)
  ).isRequired,
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
