import React from "react";
import PropTypes from "prop-types";
import {movieShape} from "../shapes";

const MovieCard = (props) => {
  const {movie, onMouseEnter, onCardClick} = props;
  const {poster, title} = movie;
  return <article onMouseEnter={() => {
    onMouseEnter(movie);
  }}
  className="small-movie-card catalog__movies-card">
    <div className="small-movie-card__image" onClick={onCardClick}>
      <img src={poster} alt={title} width="280" height="175"/>
    </div>
    <h3 className="small-movie-card__title" onClick={onCardClick}>
      <a className="small-movie-card__link" href="movie-page.html">{title}</a>
    </h3>
  </article>;
};

MovieCard.propTypes = {
  movie: PropTypes.shape(movieShape).isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default MovieCard;
