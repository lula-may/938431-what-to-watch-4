import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const onMovieTitleClick = () => {};

const App = (props) => {
  const {headerMovieTitle, genre, releaseYear, movies} = props;

  return <Main
    headerMovieTitle={headerMovieTitle}
    headerMovieGenre={genre}
    headerMovieYear={releaseYear}
    movies={movies}
    onMovieTitleClick={onMovieTitleClick}
  />;
};

App.propTypes = {
  headerMovieTitle: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  releaseYear: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
      })
  ).isRequired
};

export default App;
