import React from "react";
import PropTypes from "prop-types";
import {movieShape} from "../shapes";

const MovieCard = (props) => {
  const {movie, onMouseEnter, onTitleClick} = props;
  const {src, title} = movie;
  return <article onMouseEnter={() => {
    // debugger;
    onMouseEnter(movie);
  }}
  className="small-movie-card catalog__movies-card">
    <div className="small-movie-card__image">
      <img src={src} alt={title} width="280" height="175" />
    </div>
    <h3 className="small-movie-card__title" onClick={onTitleClick}>
      <a className="small-movie-card__link" href="movie-page.html">{title}</a>
    </h3>
  </article>;
};

MovieCard.propTypes = {
  movie: PropTypes.shape(movieShape).isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired,
};

export default MovieCard;
