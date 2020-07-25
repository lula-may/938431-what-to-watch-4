import React from "react";
import renderer from "react-test-renderer";
import {MovieDetails} from "./movie-details.jsx";
import {testMovies} from "../../test-mocks/test-films";

const movie = testMovies[1];
const avatar = `img/avatar.jpg`;

describe(`MovieDetails Component`, () => {
  it(`should render correctly MovieDetailsComponent`, () => {
    const tree = renderer.create(
        <MovieDetails
          authorizationStatus={`AUTH`}
          avatar={avatar}
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
