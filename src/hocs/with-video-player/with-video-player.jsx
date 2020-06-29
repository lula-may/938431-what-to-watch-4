import React, {PureComponent} from "react";
import VideoPlayer from "../../components/video-player/video-player.jsx";
import PropTypes from "prop-types";
import {PREVIEW, PLAYER_DELAY} from "../../const";
import {movieShape} from "../../components/shapes";

const previewPlayerSettings = {
  areControlsShown: false,
  height: PREVIEW.height,
  isMuted: true,
  width: PREVIEW.width,
};

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false
      };

      this.timeOut = null;

      this._removeActiveState = this._removeActiveState.bind(this);
      this._setActiveState = this._setActiveState.bind(this);
      this._renderVideoPlayer = this._renderVideoPlayer.bind(this);
    }

    render() {
      const {movie} = this.props;

      return (
        <Component
          {...this.props}
          renderPlayer={this._renderVideoPlayer}
          onMouseEnter={this._setActiveState(movie)}
          onMouseLeave={this._removeActiveState(movie)}
        />
      );
    }

    _renderVideoPlayer(poster, src) {
      const {isPlaying} = this.state;

      return (
        <VideoPlayer
          isPlaying={isPlaying}
          src={src}
          poster={poster}
          settings={previewPlayerSettings}
        />
      );
    }

    _setActiveState(movie) {
      return () => {
        const id = this.props.movie.id;
        const {onMouseEnter} = this.props;
        console.log(onMouseEnter);
        if (movie.id === id) {
          this.timeOut = setTimeout(() => {
            this.setState({isPlaying: true});
          }, PLAYER_DELAY);
          onMouseEnter(movie);
        }
      };
    }


    _removeActiveState(movie) {
      return () => {
        const id = this.props.movie.id;
        if (movie.id === id) {

          clearTimeout(this.timeOut);
          this.setState({isPlaying: false});
        }
      };
    }
  }

  WithVideoPlayer.propTypes = {
    movie: PropTypes.shape(movieShape).isRequired,
    onMouseEnter: PropTypes.func.isRequired,
  };

  return WithVideoPlayer;

};

export default withVideoPlayer;
