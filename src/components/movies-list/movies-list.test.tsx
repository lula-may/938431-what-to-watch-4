import * as React from "react";
import {Router} from "react-router-dom";
import * as renderer from "react-test-renderer";

import MoviesList from "./movies-list";
import history from "../../history";
import {testMovies} from "../../test-mocks/test-films";

describe(`MoviesList Component`, () => {
  it(`should render correctly MoviesListComponent`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <MoviesList
            movies={testMovies}
            moviesCount={8}
            onMovieCardEnter={() => {}}
            onMovieCardClick={() => {}}
          />
        </Router>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
