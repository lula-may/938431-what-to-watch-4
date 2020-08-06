import * as React from "react";
import {connect} from "react-redux";
import {Subtract} from "utility-types";

import {Movie} from "../../types";
import {getMovieById} from "../../reducer/data/selectors";

const INITIAL_DURATION = 1;

interface Props {
  movie: Movie;
}

interface State {
  elapsedTime: number;
  isLoading: boolean;
  isPlaying: boolean;
  progress: number;
}

interface InjectedProps {
  elapsedTime: number;
  isPlaying: boolean;
  onFullScreenButtonClick: () => void;
  onPlayButtonClick: () => void;
  progressValue: number;
}

const withFullVideo = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithFullVideo extends React.PureComponent<T, State> {
    private duration: number;
    private videoRef: React.RefObject<HTMLVideoElement>;

    constructor(props) {
      super(props);
      this.state = {
        elapsedTime: 0,
        isLoading: true,
        isPlaying: false,
        progress: 0,
      };
      this.duration = INITIAL_DURATION;
      this.videoRef = React.createRef();

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
      const video = this.videoRef.current;
      if (!document.fullscreenElement) {
        video.requestFullscreen()
          .catch((err) => err);
      } else {
        document.exitFullscreen();
      }
    }

    componentDidMount() {
      const {movie: {src}} = this.props;

      const video = this.videoRef.current;
      video.src = src;
      video.onloadedmetadata = () => {
        this.duration = video.duration;
        this.setState({
          elapsedTime: this.duration,
          isLoading: false,
          isPlaying: true,
        });
      };

      video.ontimeupdate = () => {
        const progress = Math.floor(video.currentTime);
        const elapsedTime = (this.duration - progress);
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
      const video = this.videoRef.current;
      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    componentWillUnmount() {
      const video = this.videoRef.current;
      video.onended = null;
      video.onloadedmetadata = null;
      video.ontimeupdate = null;
      video.poster = ``;
      video.src = ``;
    }

    render() {
      const {elapsedTime, isPlaying, progress} = this.state;
      const {movie: {bgPoster}} = this.props;
      const progressValue = Math.round(progress * 100 / this.duration);
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
            ref={this.videoRef}
            poster={bgPoster}
          />
        </Component>
      );
    }
  }

  return WithFullVideo;
};

const mapStateToProps = (state, props) => ({
  movie: getMovieById(state, props.match.params.id),
});

export {withFullVideo};

export default (Comp) => connect(mapStateToProps)(withFullVideo(Comp));
