import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withFullVideo from "./with-full-video.jsx";
import PropTypes from "prop-types";
import {testMovies} from "../../test-mocks/test-films.js";

configure({
  adapter: new Adapter(),
});

const movie = testMovies[0];

const MockPlayer = (props) => {
  const {children, onPlayButtonClick} = props;
  return (
    <div>
      <button onClick={onPlayButtonClick}/>
      {children}
    </div>
  );
};

MockPlayer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};

describe(`WithFullVideo HOC`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
  });

  it(`should turn on video play() when Component Did Mount`, () => {
    const MockPlayerWrapped = withFullVideo(MockPlayer);

    const wrapper = mount(
        <MockPlayerWrapped
          movie={movie}
        />
    );

    const {_videoRef} = wrapper.instance();
    jest.spyOn(_videoRef.current, `play`);

    wrapper.instance().componentDidMount();
    _videoRef.current.onloadedmetadata();

    expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
  });

  it(`should call video pause() on PlayButton click`, () => {
    const MockPlayerWrapped = withFullVideo(MockPlayer);

    const wrapper = mount(
        <MockPlayerWrapped
          movie={movie}
        />
    );

    const {_videoRef} = wrapper.instance();
    jest.spyOn(_videoRef.current, `pause`);

    wrapper.instance().componentDidMount();
    _videoRef.current.onloadedmetadata();

    const playButton = wrapper.find(`button`);
    playButton.simulate(`click`);

    expect(_videoRef.current.pause).toHaveBeenCalledTimes(1);
  });

  it(`should call video play() on the second PlayButton click`, () => {
    const MockPlayerWrapped = withFullVideo(MockPlayer);

    const wrapper = mount(
        <MockPlayerWrapped
          movie={movie}
        />
    );

    const {_videoRef} = wrapper.instance();
    jest.spyOn(_videoRef.current, `play`);

    wrapper.instance().componentDidMount();
    _videoRef.current.onloadedmetadata();

    expect(_videoRef.current.play).toHaveBeenCalledTimes(1);

    const playButton = wrapper.find(`button`);
    playButton.simulate(`click`);

    expect(_videoRef.current.play).toHaveBeenCalledTimes(1);

    playButton.simulate(`click`);
    expect(_videoRef.current.play).toHaveBeenCalledTimes(2);
  });
});
