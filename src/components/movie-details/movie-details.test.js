import React from "react";
import renderer from "react-test-renderer";
import {MovieDetails} from "./movie-details.jsx";
import {testMovies} from "../../test-mocks/test-films";

const movie = testMovies[1];
const avatar = `img/avatar.jpg`;

describe(`MovieDetails Component`, () => {
  it(`should render correctly MovieDetailsComponent with AddReview Button`, () => {
    const tree = renderer.create(
        <MovieDetails
          authorizationStatus={`AUTH`}
          avatar={avatar}
          hasLoadingError={false}
          movie={movie}
          similarMovies={testMovies}
          onMovieCardClick={() => {}}
          onPlayButtonClick={() => {}}
          onAddReviewButtonClick={() => {}}
        />
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render MovieDetailsComponent without AddReview Button for unauthorized user`, () => {
    const tree = renderer.create(
        <MovieDetails
          authorizationStatus={`NO_AUTH`}
          avatar={avatar}
          hasLoadingError={false}
          movie={movie}
          similarMovies={testMovies}
          onMovieCardClick={() => {}}
          onPlayButtonClick={() => {}}
          onAddReviewButtonClick={() => {}}
        />
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
