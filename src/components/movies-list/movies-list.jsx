import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.jsx";
import {movieShape} from "../shapes";

const MovieCardWrapped = withVideoPlayer(MovieCard);

const MoviesList = (props) => {
  const {
    movies,
    moviesCount: count,
    onMovieCardClick,
    onMouseEnter,
  } = props;
  const showedMovies = movies.slice(0, count);
  return (
    <div className="catalog__movies-list">
      {showedMovies.map((movie) => {
        return (
          <MovieCardWrapped key={movie.id}
            movie={movie}
            onCardClick={onMovieCardClick}
            onMouseEnter={onMouseEnter}
          />
        );
      })}
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape(movieShape)).isRequired,
  moviesCount: PropTypes.number.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
};

export default MoviesList;
