import * as React from "react";
import {Router} from "react-router-dom";
import * as renderer from "react-test-renderer";
import {MovieDetails} from "./movie-details";
import history from "../../history";
import {testMovies} from "../../test-mocks/test-films";

const movie = testMovies[1];
const avatar = `img/avatar.jpg`;

describe(`MovieDetails Component`, () => {
  it(`should render correctly MovieDetailsComponent with AddReview Button`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <MovieDetails
            authorizationStatus={`AUTH`}
            avatar={avatar}
            hasLoadingError={false}
            loadComments={() => {}}
            movie={movie}
            setActiveMovie = {() => {}}
            similarMovies={testMovies}
            onLogoLinkClick={() => {}}
            onMovieCardClick={() => {}}
            onMyListButtonClick={() => {}}
          />
        </Router>
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render MovieDetailsComponent without AddReview Button for unauthorized user`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <MovieDetails
            authorizationStatus={`NO_AUTH`}
            avatar={avatar}
            hasLoadingError={false}
            loadComments={() => {}}
            movie={movie}
            setActiveMovie = {() => {}}
            similarMovies={testMovies}
            onLogoLinkClick={() => {}}
            onMovieCardClick={() => {}}
            onMyListButtonClick={() => {}}
          />
        </Router>
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
