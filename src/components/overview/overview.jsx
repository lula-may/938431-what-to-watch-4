import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {movieShape} from "../shapes";

const getRatingLevel = (rating) => {
  if (rating < 3) {
    return `Bad`;
  } else if (rating < 5) {
    return `Normal`;
  } else if (rating < 8) {
    return `Good`;
  } else if (rating < 10) {
    return `Very Good`;
  }
  return `Awesome`;
};

const Overview = (props) => {
  const {movie} = props;
  const {actors, description, director, rating} = movie;
  const {count: ratingCount, score: ratingScore} = rating;

  const actorsText = `${actors.join(`, `)} and others`;
  const ratingLevel = getRatingLevel(ratingScore);

  return (
    <Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{ratingScore}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{ratingLevel}</span>
          <span className="movie-rating__count">{ratingCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>

        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {actorsText}</strong></p>
      </div>
    </Fragment>
  );
};

Overview.propTypes = {
  movie: PropTypes.shape(movieShape).isRequired,
};

export default Overview;
