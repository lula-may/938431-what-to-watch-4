import React from "react";
import {Router} from "react-router-dom";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Player from "./player.jsx";
import history from "../../history.js";
import {testMovies} from "../../test-mocks/test-films.js";

configure({
  adapter: new Adapter(),
});

const movie = testMovies[1];

describe(`Player Component`, () => {
  it(`should run callback on Play button click`, () => {
    const onPlayButtonClick = jest.fn();
    const player = mount(
        <Router history={history}>
          <Player
            elapsedTime={5000}
            isPlaying={false}
            movie={movie}
            onFullScreenButtonClick={() => {}}
            onPlayButtonClick={onPlayButtonClick}
            progressValue={30}
          >
            <video/>
          </Player>
        </Router>
    );

    const playButton = player.find(`.player__play`);

    playButton.simulate(`click`);
    expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
  });

  it(`should run callback on FullScreen button click`, () => {
    const onFullScreenButtonClick = jest.fn();
    const player = mount(
        <Router history={history}>
          <Player
            elapsedTime={5000}
            isPlaying={true}
            movie={movie}
            onExitButtonClick={() => {}}
            onFullScreenButtonClick={onFullScreenButtonClick}
            onPlayButtonClick={() => {}}
            progressValue={30}
          >
            <video/>
          </Player>
        </Router>
    );

    const fullScreenButton = player.find(`.player__full-screen`);

    fullScreenButton.simulate(`click`);
    expect(onFullScreenButtonClick).toHaveBeenCalledTimes(1);
  });

});
