import * as React from "react";
import PropTypes from "prop-types";
import {movieShape} from "../shapes";
import {formatTime} from "../../utils";

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
            {actors.map((actor, i, items) => (<React.Fragment key={actor}>{i < items.length - 1 ? `${actor},` : actor}<br/></React.Fragment>))}
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
