import * as React from "react";
import {Router} from "react-router-dom";
import * as renderer from "react-test-renderer";

import MoviesList from "./movies-list";
import history from "../../history";
import {Movie} from "../../types";
import {noop} from "../../utils";
import {testMovies} from "../../test-mocks/test-films";

const movies: Array<Movie> = testMovies;

describe(`MoviesList Component`, () => {
  it(`should render correctly MoviesListComponent`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <MoviesList
            movies={movies}
            moviesCount={8}
            onMovieCardClick={noop}
          />
        </Router>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
