import React from "react";
import renderer from "react-test-renderer";
import MovieDetails from "./movie-details.jsx";
import {testMovies} from "../../test-mocks/test-films";

const movie = testMovies[1];

it(`should render correctly MovieDetailsComponent`, () => {
  const tree = renderer.create(
      <MovieDetails
        movie={movie}
      />
  )
  .toJSON();
  expect(tree).toMatchSnapshot();
});
