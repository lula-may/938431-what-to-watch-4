import React from "react";
import PropTypes from "prop-types";
import {movieShape} from "../shapes";


const MovieCard = (props) => {
  const {children, movie: {title}, onCardClick, onCardEnter, onCardLeave} = props;

  return (
    <article
      onMouseEnter={onCardEnter}
      onMouseLeave={onCardLeave}
      className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image" onClick={onCardClick}>
        {children}
      </div>
      <h3 className="small-movie-card__title" onClick={onCardClick}>
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  movie: PropTypes.shape(movieShape).isRequired,
  onCardEnter: PropTypes.func.isRequired,
  onCardLeave: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default MovieCard;
