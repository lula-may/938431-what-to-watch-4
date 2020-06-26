import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this._videoRef = createRef();
  }

  render() {

    return (
      <video width="280" height="175"
        ref={this._videoRef}
      />
    );
  }

  componentDidMount() {
    const {src, poster} = this.props;
    const video = this._videoRef.current;
    video.src = src;
    video.loop = true;
    video.poster = poster;
    video.muted = true;
    video.autoplay = true;
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
    video.src = ``;
    video.poster = ``;
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};

export default VideoPlayer;
