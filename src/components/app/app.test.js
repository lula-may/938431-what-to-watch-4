import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {headerMovie, movies} from "../../test-mocks/test-films";

it(`Should render Jurassic Park in header`, () => {
  const tree = renderer.create(
      <App
        headerMovie={headerMovie}
        movies={movies}
      />
  )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
