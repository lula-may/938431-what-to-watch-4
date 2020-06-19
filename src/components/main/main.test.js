import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {headerMovie, movies} from "../../test-mocks/test-films";


it(`Should render Jurassik Park`, () => {
  const tree = renderer.create(
      <Main
        headerMovie={headerMovie}
        movies={movies}
        onMovieTitleClick={() => {}}
      />
  )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
