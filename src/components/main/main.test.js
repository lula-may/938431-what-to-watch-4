import React from "react";
import renderer from "react-test-renderer";

import {Main} from "./main.jsx";
import {testMovies} from "../../test-mocks/test-films";

const promoMovie = testMovies[0];
const genres = [`All genres`, `Sci-Fi`, `War`, `Detective`, `Fantasy`, `Sport`, `Adventure`];

describe(`Main Component`, () => {
  it(`Should render correctly MainComponent`, () => {
    const tree = renderer.create(
        <Main
          activeGenre={`All genres`}
          authorizationStatus={`AUTH`}
          avatar={`img/avatar.jpg`}
          genres={genres}
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
