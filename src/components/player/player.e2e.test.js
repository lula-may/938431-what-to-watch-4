import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Player from "./player.jsx";

configure({
  adapter: new Adapter(),
});

describe(`Player Component`, () => {
  it(`should run callback on Play button click`, () => {
    const onPlayButtonClick = jest.fn();
    const player = shallow(
        <Player
          elapsedTime={5000}
          isPlaying={false}
          onExitButtonClick={() => {}}
          onFullScreenButtonClick={() => {}}
          onPlayButtonClick={onPlayButtonClick}
          progressValue={30}
        >
          <video/>
        </Player>
    );

    const playButton = player.find(`.player__play`);

    playButton.simulate(`click`);
    expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
  });

  it(`should run callback on FullScreen button click`, () => {
    const onFullScreenButtonClick = jest.fn();
    const player = shallow(
        <Player
          elapsedTime={5000}
          isPlaying={true}
          onExitButtonClick={() => {}}
          onFullScreenButtonClick={onFullScreenButtonClick}
          onPlayButtonClick={() => {}}
          progressValue={30}
        >
          <video/>
        </Player>
    );

    const fullScreenButton = player.find(`.player__full-screen`);

    fullScreenButton.simulate(`click`);
    expect(onFullScreenButtonClick).toHaveBeenCalledTimes(1);
  });

  it(`should run callback on Exit button click`, () => {
    const onExitButtonClick = jest.fn();
    const player = shallow(
        <Player
          elapsedTime={5000}
          isPlaying={true}
          onExitButtonClick={onExitButtonClick}
          onFullScreenButtonClick={() => {}}
          onPlayButtonClick={() => {}}
          progressValue={30}
        >
          <video/>
        </Player>
    );

    const exitButton = player.find(`.player__exit`);

    exitButton.simulate(`click`);
    expect(onExitButtonClick).toHaveBeenCalledTimes(1);
  });
});
