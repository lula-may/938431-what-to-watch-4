import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";
import {testMovies} from "../../test-mocks/test-films";

it(`should correctly render MoviesListComponent`, () => {
  const tree = renderer.create(
      <MoviesList
        movies={testMovies}
        onMovieTitleClick={() => {}}
      />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
