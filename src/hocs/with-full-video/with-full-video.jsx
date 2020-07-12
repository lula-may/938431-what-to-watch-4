import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {movieShape} from "../../components/shapes";

const withFullVideo = (Component) => {
  class WithFullVideo extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        elapsedTime: 0,
        isLoading: true,
        isPlaying: false,
        progress: 0,
      };

      this._duration = 1;
      this._videoRef = createRef();

      this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
    }

    render() {
      const {elapsedTime, isPlaying, progress} = this.state;
      const {movie: {bigPoster}} = this.props;
      const progressValue = Math.round(progress * 100 / this._duration);
      return (
        <Component
          {...this.props}
          elapsedTime={elapsedTime}
          isPlaying={isPlaying}
          onFullScreenButtonClick={() => {}}
          onPlayButtonClick={this.handlePlayButtonClick}
          progressValue={progressValue}
        >
          <video
            className="player__video"
            ref={this._videoRef}
            poster={bigPoster}
          />
        </Component>
      );
    }

    componentDidMount() {
      const {movie: {src}} = this.props;
      const video = this._videoRef.current;
      video.src = src;

      video.onloadedmetadata = () => {
        this._duration = video.duration;
        this.setState({
          elapsedTime: this._duration,
          isLoading: false,
          isPlaying: true,
        });
      };

      video.onplay = () => this.setState({
        isPlaying: true
      });

      video.onpause = () => this.setState({
        isPlaying: false
      });

      video.ontimeupdate = () => {
        const progress = Math.floor(video.currentTime);
        const elapsedTime = (this._duration - progress);
        this.setState({
          progress,
          elapsedTime,
        });
      };
    }

    componentDidUpdate() {
      const {isPlaying} = this.state;
      const video = this._videoRef.current;

      if (isPlaying) {
        video.play();

      } else {
        video.pause();
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;
      video.onloadedmetadata = null;
      video.onpause = null;
      video.onplay = null;
      video.ontimeupdate = null;
      video.poster = ``;
      video.src = ``;
    }

    handlePlayButtonClick() {
      const {isPlaying} = this.state;
      this.setState({
        isPlaying: !isPlaying
      });
    }
  }

  WithFullVideo.propTypes = {
    movie: PropTypes.shape(movieShape).isRequired,
  };

  return WithFullVideo;

};

export default withFullVideo;
