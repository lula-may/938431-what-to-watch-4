import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropTypes from "prop-types";
import withVideoPlayer from "./with-video-player.jsx";
import {testMovies} from "../../test-mocks/test-films";
import VideoPlayer from "../../components/video-player/video-player.jsx";

configure({
  adapter: new Adapter()
});

const poster = `poster.jpg`;
const src = `video.mp3`;
const movie = testMovies[0];

describe(`WithAudioPlayer HOC`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
  });

  it(`should VideoPlayer prop "isPlaying" be changed to "true" on WithVideoPlayer state.isPlaying change to "true"`, () => {
    const handleMouseEnter = jest.fn();
    const props = {
      movie,
      onMouseEnter: handleMouseEnter
    };
    const MockComponent = ({renderPlayer}) => {
      return (
        <div
          {...props}
        >
          {renderPlayer(poster, src)}
        </div>
      );
    };

    MockComponent.propTypes = {
      renderPlayer: PropTypes.func.isRequired
    };

    const WithVideoPlayer = withVideoPlayer(MockComponent);
    const mockComponentWrapped = mount(
        <WithVideoPlayer
          {...props}
        />);
    let player = mockComponentWrapped.find(VideoPlayer);

    expect(player.props().isPlaying).toBe(false);

    mockComponentWrapped.setState({isPlaying: true});
    player = mockComponentWrapped.find(VideoPlayer);

    expect(player.props().isPlaying).toBe(true);
  });

  it(`should should run callback on mouseEntering mockComponent"`, () => {
    const handleMouseEnter = jest.fn();
    const props = {
      movie,
      onMouseEnter: handleMouseEnter
    };
    const MockComponent = ({renderPlayer}) => {
      return (
        <div
          {...props}
        >
          {renderPlayer(poster, src)}
        </div>
      );
    };

    MockComponent.propTypes = {
      renderPlayer: PropTypes.func.isRequired
    };

    const WithVideoPlayer = withVideoPlayer(MockComponent);
    const mockComponentWrapped = mount(
        <WithVideoPlayer
          {...props}
        />);
    const mockComponent = mockComponentWrapped.find(`div`);

    mockComponent.simulate(`mouseenter`);

    expect(handleMouseEnter).toHaveBeenCalledTimes(1);
  });
});

