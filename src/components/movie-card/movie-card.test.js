import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";
import {movies} from "../../test-mocks/test-films";

const movie = movies[3];

it(`should correctly render MovieCardComponent`, () => {
  const tree = renderer.create(
      <MovieCard
        movie={movie}
        onMouseEnter={() => {}}
        onTitleClick={() => {}}
      />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
