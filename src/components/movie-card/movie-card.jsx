import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {movieShape} from "../shapes";


const MovieCard = (props) => {
  const {children, movie: {id, title}, onCardClick, onCardEnter, onCardLeave} = props;

  return (
    <article
      onMouseEnter={onCardEnter}
      onMouseLeave={onCardLeave}
      className="small-movie-card catalog__movies-card">
      <Link to={`/films/${id}`} className="small-movie-card__image" onClick={onCardClick}>
        {children}
      </Link>
      <h3 className="small-movie-card__title">
        <Link to={`/films/${id}`} className="small-movie-card__link" href="movie-page.html" onClick={onCardClick}>{title}</Link>
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
