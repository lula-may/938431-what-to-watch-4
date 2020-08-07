import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import {withFullVideo} from "./with-full-video";
import {Movie} from "../../types";
import {noop} from "../../utils";
import {testMovies} from "../../test-mocks/test-films";

configure({
  adapter: new Adapter(),
});

const movie: Movie = testMovies[0];

interface Props {
    children: React.ReactNode;
    onPlayButtonClick: () => void;
}

const MockPlayer: React.FC<Props> = (props: Props) => {
  const {children, onPlayButtonClick} = props;
  return (
    <div>
      <button onClick={onPlayButtonClick}/>
      {children}
    </div>
  );
};


describe(`WithFullVideo HOC`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = noop;
    window.HTMLMediaElement.prototype.pause = noop;
  });

  it(`should turn on video play() when Component Did Mount`, () => {
    const MockPlayerWrapped = withFullVideo(MockPlayer);

    const wrapper = mount(
        <MockPlayerWrapped
          movie={movie}
        />
    );

    const {videoRef} = wrapper.instance();
    jest.spyOn(videoRef.current, `play`);

    wrapper.instance().componentDidMount();
    videoRef.current.onloadedmetadata();

    expect(videoRef.current.play).toHaveBeenCalledTimes(1);
  });

  it(`should call video pause() on PlayButton click`, () => {
    const MockPlayerWrapped = withFullVideo(MockPlayer);

    const wrapper = mount(
        <MockPlayerWrapped
          movie={movie}
        />
    );

    const {videoRef} = wrapper.instance();
    jest.spyOn(videoRef.current, `pause`);

    wrapper.instance().componentDidMount();
    videoRef.current.onloadedmetadata();

    const playButton = wrapper.find(`button`);
    playButton.simulate(`click`);

    expect(videoRef.current.pause).toHaveBeenCalledTimes(1);
  });

  it(`should call video play() on the second PlayButton click`, () => {
    const MockPlayerWrapped = withFullVideo(MockPlayer);

    const wrapper = mount(
        <MockPlayerWrapped
          movie={movie}
        />
    );

    const {videoRef} = wrapper.instance();
    jest.spyOn(videoRef.current, `play`);

    wrapper.instance().componentDidMount();
    videoRef.current.onloadedmetadata();

    expect(videoRef.current.play).toHaveBeenCalledTimes(1);

    const playButton = wrapper.find(`button`);
    playButton.simulate(`click`);

    expect(videoRef.current.play).toHaveBeenCalledTimes(1);

    playButton.simulate(`click`);
    expect(videoRef.current.play).toHaveBeenCalledTimes(2);
  });
});
