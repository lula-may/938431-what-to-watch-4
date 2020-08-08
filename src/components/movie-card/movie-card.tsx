import * as React from "react";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import {Movie} from "../../types";


interface Props {
  children: React.ReactNode;
  movie: Movie;
  onCardEnter: () => void;
  onCardLeave: () => void;
  onCardClick: () => void;
}

const MovieCard: React.FC<Props> = (props: Props) => {
  const {children, movie: {id, title}, onCardClick, onCardEnter, onCardLeave} = props;

  return (
    <article
      onMouseEnter={onCardEnter}
      onMouseLeave={onCardLeave}
      className="small-movie-card catalog__movies-card">
      <Link to={`${AppRoute.FILMS}/${id}`} className="small-movie-card__image" onClick={onCardClick}>
        {children}
      </Link>
      <h3 className="small-movie-card__title">
        <Link to={`${AppRoute.FILMS}/${id}`} className="small-movie-card__link" href="movie-page.html" onClick={onCardClick}>{title}</Link>
      </h3>
    </article>
  );
};

export default MovieCard;
