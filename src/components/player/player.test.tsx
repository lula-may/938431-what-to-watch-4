import * as React from "react";
import {Router} from "react-router-dom";
import * as renderer from "react-test-renderer";

import Player from "./player";
import history from "../../history";
import {Movie} from "../../types";
import {noop} from "../../utils";
import {testMovies} from "../../test-mocks/test-films";

const movie: Movie = testMovies[0];

describe(`Player Component`, () => {
  it(`should render correctly full screen player`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Player
            elapsedTime={5000.4}
            isPlaying={false}
            movie={movie}
            onFullScreenButtonClick={noop}
            onPlayButtonClick={noop}
            progressValue={30}
          >
            <video/>
          </Player>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
