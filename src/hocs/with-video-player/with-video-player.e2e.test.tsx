import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import withVideoPlayer from "./with-video-player";
import {Movie} from "../../types";
import {noop} from "../../utils";
import {testMovies} from "../../test-mocks/test-films";

configure({
  adapter: new Adapter()
});

const movie: Movie = testMovies[0];
interface Props {
  children: React.ReactNode;
  onCardClick: () => void;
  onCardEnter: () => void;
}

const MockComponent: React.FC<Props> = (props: Props) => {
  const {children, onCardClick, onCardEnter} = props;
  return (
    <div onMouseEnter={onCardEnter} onClick={onCardClick}>
      {children}
    </div>
  );
};


const MockComponentWrapped = withVideoPlayer(MockComponent);

describe(`WithVideoPlayer HOC`, () => {
  it(`should pass "movie" to callback on card click`, () => {
    const onCardClick = jest.fn((...args) => [...args]);
    const wrapper = mount(
        <MockComponentWrapped
          movie={movie}
          onCardClick={onCardClick}
          onCardEnter={noop}
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
          onCardClick={noop}
          onCardEnter={onCardEnter}
        />);
    expect(wrapper.instance().timeOut).toEqual(null);
    wrapper.simulate(`mouseenter`);
    expect(wrapper.instance().timeOut).not.toEqual(null);
  });
});
