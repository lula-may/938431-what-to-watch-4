import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {PREVIEW, PLAYER_DELAY} from "../../const";
import {movieShape} from "../../components/shapes";

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false
      };
      this._videoRef = createRef();
      this.timeOut = null;

      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    render() {
      const {movie: {poster}} = this.props;
      return (
        <Component
          {...this.props}
          onCardEnter={this.handleMouseEnter}
          onCardLeave={this.handleMouseLeave}
        >
          <video
            width={PREVIEW.width}
            height={PREVIEW.height}
            poster={poster}
            ref={this._videoRef}
          />
        </Component>
      );
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

    handleMouseEnter() {
      const {movie, onCardEnter} = this.props;
      this.timeOut = setTimeout(() => {
        this.setState({isPlaying: true});
      }, PLAYER_DELAY);
      onCardEnter(movie);
    }


    handleMouseLeave() {
      clearTimeout(this.timeOut);
      this.setState({isPlaying: false});
    }
  }

  WithVideoPlayer.propTypes = {
    movie: PropTypes.shape(movieShape).isRequired,
    onCardEnter: PropTypes.func.isRequired,
  };

  return WithVideoPlayer;

};

export default withVideoPlayer;
