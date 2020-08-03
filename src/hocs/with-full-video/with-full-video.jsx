import React, {PureComponent, createRef} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {movieShape} from "../../components/shapes";
import {getMovieById} from "../../reducer/data/selectors.js";

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
      this.handleFullscreenButtonClick = this.handleFullscreenButtonClick.bind(this);
    }

    handlePlayButtonClick() {
      const {isPlaying} = this.state;
      this.setState({
        isPlaying: !isPlaying
      });
    }

    handleFullscreenButtonClick() {
      const video = this._videoRef.current;
      if (!document.fullscreenElement) {
        video.requestFullscreen()
          .catch((err) => err);
      } else {
        document.exitFullscreen();
      }
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

      video.ontimeupdate = () => {
        const progress = Math.floor(video.currentTime);
        const elapsedTime = (this._duration - progress);
        this.setState({
          progress,
          elapsedTime,
        });
      };

      video.onended = () => this.setState({
        isPlaying: false,
      });

      video.onfullscreenchange = () => {
        video.controls = (document.fullscreenElement && document.fullscreenElement.nodeName === `VIDEO`);
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
      video.onended = null;
      video.onloadedmetadata = null;
      video.ontimeupdate = null;
      video.poster = ``;
      video.src = ``;
    }

    render() {
      const {elapsedTime, isPlaying, progress} = this.state;
      const {movie: {bgPoster}} = this.props;
      const progressValue = Math.round(progress * 100 / this._duration);
      return (
        <Component
          {...this.props}
          elapsedTime={elapsedTime}
          isPlaying={isPlaying}
          onFullScreenButtonClick={this.handleFullscreenButtonClick}
          onPlayButtonClick={this.handlePlayButtonClick}
          progressValue={progressValue}
        >
          <video
            className="player__video"
            ref={this._videoRef}
            poster={bgPoster}
          />
        </Component>
      );
    }
  }

  WithFullVideo.propTypes = {
    movie: PropTypes.shape(movieShape).isRequired,
  };

  return WithFullVideo;

};

const mapStateToProps = (state, props) => ({
  movie: getMovieById(state, props.match.params.id),
});

export {withFullVideo};

export default (Comp) => connect(mapStateToProps)(withFullVideo(Comp));
