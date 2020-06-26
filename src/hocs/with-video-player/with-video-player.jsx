import React, {PureComponent} from "react";
import VideoPlayer from "../../components/video-player/video-player.jsx";

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {

      return (
        <Component
          {...this.props}
          renderVideo={(src, poster) => {
            return (
              <VideoPlayer
                src={src}
                poster={poster}
              />
            );
          }}
        />
      );
    }
  }

  WithVideoPlayer.propTypes = {};

  return WithVideoPlayer;
};

export default withVideoPlayer;
