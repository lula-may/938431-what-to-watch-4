import * as React from "react";
import PropTypes from "prop-types";
import {PREVIEW, PLAYER_DELAY} from "../../const";
import {movieShape} from "../../components/shapes";

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false
      };
      this._videoRef = React.createRef();
      this.timeOut = null;

      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
      this.handleCardClick = this.handleCardClick.bind(this);
    }

    handleMouseEnter() {
      this.timeOut = setTimeout(() => {
        this.setState({isPlaying: true});
      }, PLAYER_DELAY);
    }

    handleCardClick() {
      const {movie, onCardClick} = this.props;
      onCardClick(movie);
    }

    handleMouseLeave() {
      clearTimeout(this.timeOut);
      this.setState({isPlaying: false});
    }

    componentDidUpdate() {
      const {movie: {src}} = this.props;
      const {isPlaying} = this.state;
      const video = this._videoRef.current;

      if (isPlaying) {
        video.src = src;
        video.muted = true;
        video.autoplay = true;

      } else {
        video.src = ``;
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;
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
            ref={this._videoRef}
          />
        </Component>
      );
    }
  }

  WithVideoPlayer.propTypes = {
    movie: PropTypes.shape(movieShape).isRequired,
    onCardClick: PropTypes.func.isRequired,
  };

  return WithVideoPlayer;
};

export default withVideoPlayer;
