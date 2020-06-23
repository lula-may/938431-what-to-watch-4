import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {testMovies} from "../../test-mocks/test-films";

const headerMovie = testMovies[0];
it(`Should render Jurassik Park in header`, () => {
  const tree = renderer.create(
      <Main
        headerMovie={headerMovie}
        movies={testMovies}
        onMovieCardClick={() => {}}
      />
  )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
