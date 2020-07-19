import React from "react";
import renderer from "react-test-renderer";

import Main from "./main.jsx";
import {testMovies} from "../../test-mocks/test-films";

const promoMovie = testMovies[0];

describe(`Main Component`, () => {
  it(`Should render correctly MainComponent`, () => {
    const tree = renderer.create(
        <Main
          activeGenre={`All genres`}
          promoMovie={promoMovie}
          movies={testMovies}
          moviesCount={5}
          onGenreClick={() => {}}
          onMovieCardClick={() => {}}
          onPlayButtonClick={() => {}}
          onShowMoreButtonClick={() => {}}
        />
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
