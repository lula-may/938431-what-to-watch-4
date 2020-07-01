import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player.jsx";
import {movieShape} from "../shapes";

const MovieCardWrapped = withVideoPlayer(MovieCard);

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._setClickListener = this._setClickListener.bind(this);
  }

  render() {
    const {movies} = this.props;
    return (
      <div className="catalog__movies-list">
        {movies.map((movie) => {
          return (
            <MovieCardWrapped key={movie.id}
              movie={movie}
              onMouseEnter={this._handleMouseEnter}
              onCardClick={this._setClickListener(movie)}
            />
          );
        })}
      </div>
    );
  }

  _handleMouseEnter(movie) {
    this.setState({movie});
  }

  _setClickListener(movie) {
    return (evt) => {
      const {onMovieCardClick} = this.props;
      evt.preventDefault();
      onMovieCardClick(movie);
    };
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape(movieShape)).isRequired,
  onMovieCardClick: PropTypes.func.isRequired
};

export default MoviesList;
