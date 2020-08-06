import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import PropTypes from "prop-types";
import withVideoPlayer from "./with-video-player";
import {testMovies} from "../../test-mocks/test-films";

configure({
  adapter: new Adapter()
});

const movie = testMovies[0];

const MockComponent = (props) => {
  const {children, onCardClick, onCardEnter} = props;
  return (
    <div onMouseEnter={onCardEnter} onClick={onCardClick}>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.node.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardEnter: PropTypes.func.isRequired,
};

const MockComponentWrapped = withVideoPlayer(MockComponent);

describe(`WithVideoPlayer HOC`, () => {
  it(`should pass "movie" to callback on card click`, () => {
    const onCardClick = jest.fn((...args) => [...args]);
    const wrapper = mount(
        <MockComponentWrapped
          movie={movie}
          onCardClick={onCardClick}
          onCardEnter={() => {}}
        />);
    wrapper.simulate(`click`);

    expect(onCardClick).toHaveBeenCalledTimes(1);
    expect(onCardClick.mock.calls[0][0]).toEqual(movie);
  });

  it(`should set TimeOut on mouse entering`, () => {
    const onCardEnter = jest.fn((...args) => [...args]);
    const wrapper = mount(
        <MockComponentWrapped
          movie={movie}
          onCardClick={() => {}}
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
    const wrapper = mount(
        <MockComponentWrapped
          movie={movie}
          onCardClick={() => {}}
          onCardEnter={() => {}}
        />);
    const {_videoRef} = wrapper.instance();
    expect(_videoRef.current.autoplay).toEqual(false);
    expect(_videoRef.current.src).toEqual(``);

    wrapper.simulate(`mouseenter`);

    expect(_videoRef.current.autoplay).toBe(true);
    expect(_videoRef.current.src).toContain(movie.src);
  });
});
