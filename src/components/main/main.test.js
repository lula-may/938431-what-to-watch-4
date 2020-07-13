import React from "react";
import renderer from "react-test-renderer";

import Main from "./main.jsx";
import {testMovies} from "../../test-mocks/test-films";

const headerMovie = testMovies[0];

describe(`Main Component`, () => {
  it(`Should render Jurassik Park in header`, () => {
    const tree = renderer.create(
        <Main
          activeGenre={`All genres`}
          headerMovie={headerMovie}
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
