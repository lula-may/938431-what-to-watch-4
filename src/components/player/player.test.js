import React from "react";
import renderer from "react-test-renderer";
import Player from "./player.jsx";

describe(`Player Component`, () => {
  it(`should render correctly full screen player`, () => {
    const tree = renderer.create(
        <Player
          elapsedTime={5000.4}
          isPlaying={false}
          onFullScreenButtonClick={() => {}}
          onPlayButtonClick={() => {}}
          progressValue={30}
        >
          <video/>
        </Player>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
