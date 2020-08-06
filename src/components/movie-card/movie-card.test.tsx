import * as React from "react";
import {Router} from "react-router-dom";
import * as renderer from "react-test-renderer";

import MovieCard from "./movie-card";
import history from "../../history";
import {testMovies} from "../../test-mocks/test-films";

const movie = testMovies[4];
describe(`MovieCard Component`, () => {
  it(`should render correctly MovieCardComponent`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <MovieCard
            movie={movie}
            onCardClick={() => {}}
            onCardEnter={() => {}}
            onCardLeave={() => {}}
          >
            <video/>
          </MovieCard>
        </Router>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
