import * as React from "react";
import {Router} from "react-router-dom";
import * as renderer from "react-test-renderer";

import MovieCard from "./movie-card";
import history from "../../history";
import {Movie} from "../../types";
import {noop} from "../../utils";
import {testMovies} from "../../test-mocks/test-films";

const movie: Movie = testMovies[4];
describe(`MovieCard Component`, () => {
  it(`should render correctly MovieCardComponent`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <MovieCard
            movie={movie}
            onCardClick={noop}
            onCardEnter={noop}
            onCardLeave={noop}
          >
            <video/>
          </MovieCard>
        </Router>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
