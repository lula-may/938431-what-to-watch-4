import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";
import {movies} from "../../test-mocks/test-films";

it(`should correctly render MoviesList Component`, () => {
  const tree = renderer.create(
      <MoviesList
        movies={movies}
        onMovieTitleClick={() => {}}
      />
  )
  .toJSON;

  expect(tree).toMatchSnapshot();
});
