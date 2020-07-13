import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withActiveMovie = (Component) => {
  class WithActiveMovie extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        movie: null,
      };

      this.handleCardClick = this.handleCardClick.bind(this);
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
    }

    render() {
      return (
        <Component
          {... this.props}
          onMouseEnter={this.handleMouseEnter}
          onMovieCardClick={this.handleCardClick}
        />
      );
    }

    handleCardClick(evt) {
      const {onMovieCardClick} = this.props;
      const {movie} = this.state;
      evt.preventDefault();
      onMovieCardClick(movie);
    }

    handleMouseEnter(movie) {
      this.setState({movie});
    }
  }

  WithActiveMovie.propTypes = {
    onMovieCardClick: PropTypes.func.isRequired,
  };

  return WithActiveMovie;
};

export default withActiveMovie;
