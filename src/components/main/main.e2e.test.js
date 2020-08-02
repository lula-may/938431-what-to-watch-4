import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Router} from "react-router-dom";

import history from "../../history.js";
import {Main} from "./main.jsx";
import {testMovies} from "../../test-mocks/test-films";

Enzyme.configure({
  adapter: new Adapter()
});

const promoMovie = testMovies[0];
const showedMovies = testMovies.slice(1);
const genres = [`All genres`, `Sci-Fi`, `War`, `Detective`, `Fantasy`, `Sport`, `Adventure`];

describe(`MainComponent`, () => {
  it(`should run callback on tab click`, () => {
    const onGenreClick = jest.fn();
    const mainElement = mount(
        <Router history={history}>
          <Main
            activeGenre={`All genres`}
            authorizationStatus={`AUTH`}
            avatar={`img/avatar.jpg`}
            genres={genres}
            hasUploadingError={false}
            isUploading={false}
            movies={showedMovies}
            moviesCount={8}
            onGenreClick={onGenreClick}
            onMovieCardClick={() => {}}
            onPlayButtonClick={() => {}}
            onShowMoreButtonClick={() => {}}
            onMyListButtonClick={() => {}}
            promoMovie={promoMovie}
          />
        </Router>
    );
    const genreLink = mainElement.find(`.catalog__genres-link`).at(1);

    genreLink.simulate(`click`, {preventDefault: () => {}});
    expect(onGenreClick).toHaveBeenCalledTimes(1);
  });

  it(`should run callback on Show More button click`, () => {
    const onShowMoreButtonClick = jest.fn();
    const mainElement = mount(
        <Router history={history}>
          <Main
            activeGenre={`All genres`}
            authorizationStatus={`AUTH`}
            avatar={`img/avatar.jpg`}
            genres={genres}
            hasUploadingError={false}
            isUploading={false}
            movies={showedMovies}
            moviesCount={4}
            onGenreClick={() => {}}
            onMovieCardClick={() => {}}
            onPlayButtonClick={() => {}}
            onShowMoreButtonClick={onShowMoreButtonClick}
            onMyListButtonClick={() => {}}
            promoMovie={promoMovie}
          />
        </Router>
    );
    const showMoreButton = mainElement.find(`.catalog__button`);

    showMoreButton.simulate(`click`);
    expect(onShowMoreButtonClick).toHaveBeenCalledTimes(1);
  });
});
