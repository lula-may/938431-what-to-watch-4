import * as React from "react";
import {Router} from "react-router-dom";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import Player from "./player";
import history from "../../history";
import {Movie} from "../../types";
import {noop} from "../../utils";
import {testMovies} from "../../test-mocks/test-films";

configure({
  adapter: new Adapter(),
});

const movie: Movie = testMovies[1];

describe(`Player Component`, () => {
  it(`should run callback on Play button click`, () => {
    const onPlayButtonClick = jest.fn();
    const player = mount(
        <Router history={history}>
          <Player
            elapsedTime={5000}
            isPlaying={false}
            movie={movie}
            onFullScreenButtonClick={noop}
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
            onFullScreenButtonClick={onFullScreenButtonClick}
            onPlayButtonClick={noop}
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
