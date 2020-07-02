import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {movieShape} from "../shapes";

const HOUR = 60;

const getActorsList = (actors) => {
  const lastIndex = actors.length - 1;
  const actorsWithComma = actors.map((actor) => (`${actor},`));
  actorsWithComma[lastIndex] = actors[lastIndex];
  return <Fragment>
    {actorsWithComma.map((actor) => (
      <Fragment key={actor}>
        {actor}<br/>
      </Fragment>
    ))}
  </Fragment>;
};
const formatTime = (duration) => {
  const hours = Math.floor(duration / HOUR);
  const minutes = duration % HOUR;

  return (
    (hours > 0)
      ? `${hours}h ${minutes}m`
      : `${minutes}m`
  );
};

const Details = (props) => {
  const {movie} = props;
  const {actors, director, genre, releaseYear, runTime} = movie;
  const duration = formatTime(runTime);
  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value">
            {getActorsList(actors)}
          </span>
        </p>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{duration}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{releaseYear}</span>
        </p>
      </div>
    </div>
  );
};

Details.propTypes = {
  movie: PropTypes.shape(movieShape).isRequired,
};

export default Details;
