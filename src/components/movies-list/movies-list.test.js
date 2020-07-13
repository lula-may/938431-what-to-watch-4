import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";
import {testMovies} from "../../test-mocks/test-films";

it(`should render correctly MoviesListComponent`, () => {
  const tree = renderer.create(
      <MoviesList
        movies={testMovies}
        moviesCount={8}
        onMouseEnter={() => {}}
        onMovieCardClick={() => {}}
      />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
