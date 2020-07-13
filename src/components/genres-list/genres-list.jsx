import React from "react";
import PropTypes from "prop-types";

import {DEFAULT_GENRE, MAX_GENRES_COUNT} from "../../const.js";
import {getUniqueItems} from "../../utils.js";
import {movieShape} from "../shapes.js";

const getMovieGenres = (movies) => {
  const allMoviesGenres = movies.map((movie) => movie.genre);
  return getUniqueItems(allMoviesGenres);
};

const GenresList = (props) => {
  const {activeItem: activeGenre, movies, onClick} = props;
  const genres = getMovieGenres(movies);
  const genreTitles = genres.slice(0, MAX_GENRES_COUNT);
  genreTitles.unshift(DEFAULT_GENRE);

  return (
    <ul className="catalog__genres-list">
      {genreTitles.map((genre) => {
        const isActive = (activeGenre === genre);
        return (
          <li key={genre} className={`catalog__genres-item${isActive ? ` catalog__genres-item--active` : ``}`}>
            <a id={genre} href="#" className="catalog__genres-link" onClick={onClick}>{genre}</a>
          </li>
        );
      })}
    </ul>
  );
};

GenresList.propTypes = {
  activeItem: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape(movieShape)).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GenresList;
