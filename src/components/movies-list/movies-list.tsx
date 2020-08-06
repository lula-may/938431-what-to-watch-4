import * as React from "react";

import MovieCard from "../movie-card/movie-card";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player";
import {Movie} from "../../types";

interface Props {
  movies: Array<Movie>;
  moviesCount: number;
  onMovieCardClick: (Movie) => void;
}

const MovieCardWrapped = withVideoPlayer(MovieCard);

const MoviesList: React.FC<Props> = (props: Props) => {
  const {
    movies,
    moviesCount: count,
    onMovieCardClick,
  } = props;
  const showedMovies = movies.slice(0, count);
  return (
    <div className="catalog__movies-list">
      {showedMovies.map((movie) => {
        return (
          <MovieCardWrapped key={movie.id}
            movie={movie}
            onCardClick={onMovieCardClick}
          />
        );
      })}
    </div>
  );
};

export default MoviesList;
