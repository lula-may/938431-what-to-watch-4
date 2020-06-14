import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const App = (props) => {
  const {headerMovieTitle, genre, releaseYear, movies} = props;

  return <Main
    headerMovieTitle={headerMovieTitle}
    headerMovieGenre={genre}
    headerMovieYear={releaseYear}
    movieTitles={movies}
  />;
};

App.propTypes = {
  headerMovieTitle: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  releaseYear: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;
