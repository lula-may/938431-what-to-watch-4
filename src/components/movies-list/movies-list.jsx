import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
import {movieShape} from "../shapes";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
  }

  render() {
    const {movies, onMovieTitleClick} = this.props;
    return (
      <div className="catalog__movies-list">
        {movies.map((movie) => {
          return (
            <MovieCard key={movie.id}
              movie={movie}
              onMouseEnter={this._handleMouseEnter}
              onCardClick={(evt) => {
                evt.preventDefault();
                onMovieTitleClick(movie);
              }}
            />
          );
        })}
      </div>
    );
  }

  _handleMouseEnter(movie) {
    this.setState({movie});
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape(movieShape)).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired
};

export default MoviesList;
