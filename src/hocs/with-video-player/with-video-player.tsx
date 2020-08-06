import * as React from "react";
import {Subtract} from "utility-types";

import {PREVIEW, PLAYER_DELAY} from "../../const";
import {Movie} from "../../types";

interface Props {
  movie: Movie;
  onCardClick: (movie: Movie) => void;
}

interface State {
  isPlaying: boolean;
}

interface InjectedProps {
  onCardEnter: () => void;
  onCardLeave: () => void;
  onCardClick: () => void;
}

const withVideoPlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithVideoPlayer extends React.PureComponent<T, State> {
    private videoRef: React.RefObject<HTMLVideoElement>;
    private timeOut: number;

    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false
      };
      this.videoRef = React.createRef();
      this.timeOut = null;

      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
      this.handleCardClick = this.handleCardClick.bind(this);
    }

    handleMouseEnter() {
      this.timeOut = window.setTimeout(() => {
        this.setState({isPlaying: true});
      }, PLAYER_DELAY);
    }

    handleCardClick() {
      const {movie, onCardClick} = this.props;
      onCardClick(movie);
    }

    handleMouseLeave() {
      window.clearTimeout(this.timeOut);
      this.setState({isPlaying: false});
    }

    componentDidUpdate() {
      const {movie: {src}} = this.props;
      const {isPlaying} = this.state;
      const video = this.videoRef.current;

      if (isPlaying) {
        video.src = src;
        video.muted = true;
        video.autoplay = true;

      } else {
        video.src = ``;
      }
    }

    componentWillUnmount() {
      const video = this.videoRef.current;
      video.src = ``;
      video.poster = ``;

      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
    }

    render() {
      const {movie: {previewPoster}} = this.props;
      return (
        <Component
          {...this.props}
          onCardEnter={this.handleMouseEnter}
          onCardLeave={this.handleMouseLeave}
          onCardClick={this.handleCardClick}
        >
          <video
            width={PREVIEW.width}
            height={PREVIEW.height}
            poster={previewPoster}
            ref={this.videoRef}
          />
        </Component>
      );
    }
  }

  return WithVideoPlayer;
};

export default withVideoPlayer;
