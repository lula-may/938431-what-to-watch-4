import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";
import {testMovies} from "../../test-mocks/test-films";

const movie = testMovies[4];


it(`should render correctly MovieCardComponent`, () => {
  const tree = renderer.create(
      <MovieCard
        movie={movie}
        onCardClick={() => {}}
        onCardEnter={() => {}}
        onCardLeave={() => {}}
      >
        <video/>
      </MovieCard>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
