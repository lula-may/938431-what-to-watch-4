import React from "react";
import PropTypes from "prop-types";
import {movieShape} from "../shapes";


const MovieCard = (props) => {
  const {movie, onCardClick, renderPlayer} = props;
  const {poster, src, title} = movie;
  const {onMouseEnter, onMouseLeave} = props;

  return (
    <article
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image" onClick={onCardClick}>
        {renderPlayer(poster, src)}
      </div>
      <h3 className="small-movie-card__title" onClick={onCardClick}>
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape(movieShape).isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default MovieCard;
