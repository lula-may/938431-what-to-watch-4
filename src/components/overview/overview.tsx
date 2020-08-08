import * as React from "react";

import {getRatingLevel} from "../../utils";
import {Movie} from "../../types";

interface Props {
  movie: Movie;
}

const Overview: React.FC<Props> = (props: Props) => {
  const {movie} = props;
  const {actors, description, director, rating} = movie;
  const {count: ratingCount, score: ratingScore} = rating;

  const actorsText = `${actors.join(`, `)} and others`;
  const ratingLevel = getRatingLevel(ratingScore);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Overview;
