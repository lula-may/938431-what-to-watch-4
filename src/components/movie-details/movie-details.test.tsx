import * as React from "react";
import {Router} from "react-router-dom";
import * as renderer from "react-test-renderer";

import {AuthorizationStatus} from "../../reducer/user/user";
import {MovieDetails} from "./movie-details";
import history from "../../history";
import {Movie, Review} from "../../types";
import {noop} from "../../utils";
import {testMovies} from "../../test-mocks/test-films";

const avatar = `img/avatar.jpg`;
const movie: Movie = testMovies[1];
const similarMovies: Array<Movie> = testMovies;
const comments: Array<Review | null> = [];

describe(`MovieDetails Component`, () => {
  it(`should render correctly MovieDetailsComponent`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <MovieDetails
            authorizationStatus={AuthorizationStatus.AUTH}
            avatar={avatar}
            comments={comments}
            hasLoadingError={false}
            loadComments={noop}
            movie={movie}
            setActiveMovie = {noop}
            similarMovies={similarMovies}
            onMovieCardClick={noop}
            onMyListButtonClick={noop}
          />
        </Router>
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
