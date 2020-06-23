import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {testMovies} from "../../test-mocks/test-films";

const headerMovie = testMovies[0];
const movies = testMovies.slice(1);
it(`Should render Jurassik Park`, () => {
  const tree = renderer.create(
      <Main
        headerMovie={headerMovie}
        movies={movies}
        onMovieCardClick={() => {}}
      />
  )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
