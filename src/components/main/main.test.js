import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import {Main} from "./main.jsx";

import history from "../../history.js";
import {testMovies} from "../../test-mocks/test-films";

const promoMovie = testMovies[0];
const genres = [`All genres`, `Sci-Fi`, `War`, `Detective`, `Fantasy`, `Sport`, `Adventure`];

describe(`Main Component`, () => {
  it(`Should render correctly MainComponent`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Main
            activeGenre={`All genres`}
            authorizationStatus={`AUTH`}
            avatar={`img/avatar.jpg`}
            genres={genres}
            hasUploadingError={false}
            isUploading={false}
            movies={testMovies}
            moviesCount={5}
            onGenreClick={() => {}}
            onMovieCardClick={() => {}}
            onMyListButtonClick={() => {}}
            onPlayButtonClick={() => {}}
            onShowMoreButtonClick={() => {}}
            promoMovie={promoMovie}
          />
        </Router>
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
