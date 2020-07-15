import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropTypes from "prop-types";
import withVideoPlayer from "./with-video-player.jsx";
import {testMovies} from "../../test-mocks/test-films";

configure({
  adapter: new Adapter()
});

const movie = testMovies[0];

const MockComponent = (props) => {
  const {children, onCardEnter} = props;
  return (
    <div onMouseEnter={onCardEnter}>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.node.isRequired,
  onCardEnter: PropTypes.func.isRequired,
};

const MockComponentWrapped = withVideoPlayer(MockComponent);

describe(`WithVideoPlayer HOC`, () => {
  it(`should pass "movie" to callback on mouse entering`, () => {
    const onCardEnter = jest.fn((...args) => [...args]);
    const wrapper = mount(
        <MockComponentWrapped
          movie={movie}
          onCardEnter={onCardEnter}
        />);
    wrapper.simulate(`mouseenter`);

    expect(onCardEnter).toHaveBeenCalledTimes(1);
    expect(onCardEnter.mock.calls[0][0]).toEqual(movie);
  });

  it(`should set TimeOut on mouse entering`, () => {
    const onCardEnter = jest.fn((...args) => [...args]);
    const wrapper = mount(
        <MockComponentWrapped
          movie={movie}
          onCardEnter={onCardEnter}
        />);
    expect(wrapper.instance().timeOut).toEqual(null);
    wrapper.simulate(`mouseenter`);
    expect(wrapper.instance().timeOut).not.toEqual(null);
  });

  it(`should autoplay video on mouse entering and timeout is over`, () => {
    window.setTimeout = (func, timer) => {
      func();
      return timer;
    };
    const onCardEnter = jest.fn();
    const wrapper = mount(
        <MockComponentWrapped
          movie={movie}
          onCardEnter={onCardEnter}
        />);
    const {_videoRef} = wrapper.instance();
    expect(_videoRef.current.autoplay).toEqual(false);
    expect(_videoRef.current.src).toEqual(``);

    wrapper.simulate(`mouseenter`);

    expect(_videoRef.current.autoplay).toBe(true);
    expect(_videoRef.current.src).toContain(movie.src);
  });
});
