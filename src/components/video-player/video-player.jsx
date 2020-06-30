import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {videoPlayerShape} from "../shapes";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this._videoRef = createRef();
  }

  render() {
    const {settings, poster} = this.props;
    const {height, width} = settings;

    return (
      <video
        width={width}
        height={height}
        poster={poster}
        ref={this._videoRef}
      />
    );
  }

  componentDidUpdate() {
    const {isPlaying, settings, src} = this.props;
    const video = this._videoRef.current;

    if (isPlaying) {
      video.controls = settings.areControlsShown;
      video.src = src;
      video.muted = settings.isMuted;
      video.autoplay = true;

    } else {
      video.src = ``;
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
    video.src = ``;
    video.poster = ``;
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  poster: PropTypes.string.isRequired,
  settings: PropTypes.shape(videoPlayerShape).isRequired,
  src: PropTypes.string.isRequired,
};

export default VideoPlayer;
