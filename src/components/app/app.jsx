import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import {headerMovieShape, movieShape} from "../shapes.js";

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
  headerMovie: PropTypes.shape(headerMovieShape).isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape(movieShape)
  ).isRequired
};

export default App;
