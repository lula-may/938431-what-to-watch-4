import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {testMovies} from "../../test-mocks/test-films";

const headerMovie = testMovies[0];

it(`Should render Jurassic Park in header`, () => {
  const tree = renderer.create(
      <App
        headerMovie={headerMovie}
        movies={testMovies}
      />
  )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
