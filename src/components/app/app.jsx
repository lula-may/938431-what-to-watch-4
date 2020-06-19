import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const onMovieTitleClick = () => {};

const App = (props) => {
  const {headerMovie, movies} = props;

  return <Main
    headerMovie={headerMovie}
    movies={movies}
    onMovieTitleClick={onMovieTitleClick}
  />;
};

App.propTypes = {
  headerMovie: PropTypes.shape({
    bg: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      })
  ).isRequired
};

export default App;
