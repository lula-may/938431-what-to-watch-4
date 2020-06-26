import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";
import {testMovies} from "../../test-mocks/test-films";

const movie = testMovies[4];

it(`should correctly render MovieCardComponent`, () => {
  const tree = renderer.create(
      <MovieCard
        movie={movie}
        onMouseEnter={() => {}}
        onCardClick={() => {}}
        renderVideo={() => {}}
      />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
