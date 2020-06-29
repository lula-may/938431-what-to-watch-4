import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player.jsx";
import {testMovies} from "../../test-mocks/test-films";

const mockSettings = {
  areControlsShown: false,
  height: `100`,
  isMuted: true,
  width: `200`,
};

const movie = testMovies[0];

it(`should correctly render VideoPlayer component`, () => {
  const tree = renderer.create(
      <VideoPlayer
        isPlaying={false}
        onActiveChange={() => {}}
        settings={mockSettings}
        poster={movie.poster}
        src={movie.src}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
