import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {movieShape} from "../shapes";

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVideoPlaying: false
    };
    this.timeOut = null;
    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  render() {
    const {movie, onCardClick} = this.props;
    const {title} = movie;

    return (
      <article
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        className="small-movie-card catalog__movies-card">
        <div className="small-movie-card__image" onClick={onCardClick}>
          {this._renderMedia()}
        </div>
        <h3 className="small-movie-card__title" onClick={onCardClick}>
          <a className="small-movie-card__link" href="movie-page.html">{title}</a>
        </h3>
      </article>
    );
  }

  _handleMouseEnter() {
    const {movie, onMouseEnter} = this.props;

    this.timeOut = setTimeout(() => {
      this.setState({isVideoPlaying: true});
    }, 1000);
    onMouseEnter(movie);
  }

  _handleMouseLeave() {
    clearTimeout(this.timeOut);
    this.setState({isVideoPlaying: false});
  }

  _renderMedia() {
    const {movie, renderVideo} = this.props;
    const {poster, src, title} = movie;
    const {isVideoPlaying} = this.state;
    if (isVideoPlaying) {
      return renderVideo(src, poster);
    } else {
      return <img src={poster} alt={title} width="280" height="175"/>;
    }
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape(movieShape).isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  renderVideo: PropTypes.func.isRequired,
};

export default MovieCard;
