import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {ActionCreator} from "../../reducer.js";
import {DEFAULT_GENRE, MAX_GENRES_COUNT} from "../../const.js";
import {getUniqueItems} from "../../utils.js";
import {movieShape} from "../shapes.js";

const getMovieGenres = (movies) => {
  const allMoviesGenres = movies.map((movie) => movie.genre);
  return getUniqueItems(allMoviesGenres);
};

const GenresList = (props) => {
  const {activeGenre, movies, onGenreClick} = props;
  const genres = getMovieGenres(movies);
  const genreTitles = genres.slice(0, MAX_GENRES_COUNT);
  genreTitles.unshift(DEFAULT_GENRE);

  const handleGenreClick = (evt) => {
    evt.preventDefault();
    onGenreClick(evt.target.id, movies);
  };

  return (
    <ul className="catalog__genres-list">
      {genreTitles.map((genre) => {
        const isActive = (activeGenre === genre);
        return (
          <li key={genre} className={`catalog__genres-item${isActive ? ` catalog__genres-item--active` : ``}`}>
            <a id={genre} href="#" className="catalog__genres-link" onClick={handleGenreClick}>{genre}</a>
          </li>
        );
      })}
    </ul>
  );
};

GenresList.propTypes = {
  activeGenre: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape(movieShape)).isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeGenre: state.genre,
  movies: state.allMovies,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre, movies) {
    dispatch(ActionCreator.setGenre(genre));
    dispatch(ActionCreator.setShowedFilms(genre, movies));
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
