import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
import {movieShape} from "../shapes";
import {PREVIEW} from "../../const";

const previewPlayerSettings = {
  areControlsShown: false,
  height: PREVIEW.height,
  isMuted: true,
  width: PREVIEW.width,
};

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
    const {poster, src, title} = movie;
    const {isVideoPlaying} = this.state;

    return (
      <article
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        className="small-movie-card catalog__movies-card">
        <div className="small-movie-card__image" onClick={onCardClick}>
          <VideoPlayer
            isPlaying={isVideoPlaying}
            poster={poster}
            src={src}
            settings={previewPlayerSettings}
          />
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
}

MovieCard.propTypes = {
  movie: PropTypes.shape(movieShape).isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default MovieCard;
