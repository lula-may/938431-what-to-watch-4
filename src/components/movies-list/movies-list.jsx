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
    this._handleCardClick = this._handleCardClick.bind(this);
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
              onCardClick={(evt) => this._handleCardClick(evt, movie)}
            />
          );
        })}
      </div>
    );
  }

  _handleMouseEnter(movie) {
    this.setState({movie});
  }

  _handleCardClick(evt, movie) {
    const {onMovieCardClick} = this.props;
    evt.preventDefault();
    onMovieCardClick(movie);
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape(movieShape)).isRequired,
  onMovieCardClick: PropTypes.func.isRequired
};

export default MoviesList;
