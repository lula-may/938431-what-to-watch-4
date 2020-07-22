import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {Main} from "./main.jsx";
import {testMovies} from "../../test-mocks/test-films";

Enzyme.configure({
  adapter: new Adapter()
});

const mockStore = configureStore([]);

const promoMovie = testMovies[0];
const showedMovies = testMovies.slice(1);
const genres = [`All genres`, `Sci-Fi`, `War`, `Detective`, `Fantasy`, `Sport`, `Adventure`];

const store = mockStore({
  moviesCount: 4,
  genre: `All movies`,
  movies: testMovies,
  page: `main`,
});

describe(`MainComponent`, () => {
  it(`should run callback on every movie title click`, () => {
    const onMovieCardClick = jest.fn();
    const mainElement = mount(
        <Provider store={store}>
          <Main
            activeGenre={`All genres`}
            authorizationStatus={`AUTH`}
            avatar={`img/avatar.jpg`}
            genres={genres}
            promoMovie={promoMovie}
            movies={showedMovies}
            moviesCount={8}
            onGenreClick={() =>{}}
            onMovieCardClick={onMovieCardClick}
            onPlayButtonClick={() => {}}
            onShowMoreButtonClick={() => {}}
          />
        </Provider>
    );
    const titleElements = mainElement.find(`h3.small-movie-card__title`);
    titleElements.forEach((element) => element.simulate(`click`, {}));
    expect(onMovieCardClick).toHaveBeenCalledTimes(showedMovies.length);
  });

  it(`should run callback on tab click`, () => {
    const onGenreClick = jest.fn();
    const mainElement = mount(
        <Provider store={store}>
          <Main
            activeGenre={`All genres`}
            authorizationStatus={`AUTH`}
            avatar={`img/avatar.jpg`}
            genres={genres}
            promoMovie={promoMovie}
            movies={showedMovies}
            moviesCount={8}
            onGenreClick={onGenreClick}
            onMovieCardClick={() => {}}
            onPlayButtonClick={() => {}}
            onShowMoreButtonClick={() => {}}
          />
        </Provider>
    );
    const genreLink = mainElement.find(`.catalog__genres-link`).at(1);

    genreLink.simulate(`click`, {preventDefault: () => {}});
    expect(onGenreClick).toHaveBeenCalledTimes(1);
  });

  it(`should run callback on Show More button click`, () => {
    const onShowMoreButtonClick = jest.fn();
    const mainElement = mount(
        <Provider store={store}>
          <Main
            activeGenre={`All genres`}
            authorizationStatus={`AUTH`}
            avatar={`img/avatar.jpg`}
            genres={genres}
            promoMovie={promoMovie}
            movies={showedMovies}
            moviesCount={4}
            onGenreClick={() => {}}
            onMovieCardClick={() => {}}
            onPlayButtonClick={() => {}}
            onShowMoreButtonClick={onShowMoreButtonClick}
          />
        </Provider>
    );
    const showMoreButton = mainElement.find(`.catalog__button`);

    showMoreButton.simulate(`click`);
    expect(onShowMoreButtonClick).toHaveBeenCalledTimes(1);
  });

  it(`should run callback on Play button click`, () => {
    const onPlayButtonClick = jest.fn();
    const mainElement = mount(
        <Provider store={store}>
          <Main
            activeGenre={`All genres`}
            authorizationStatus={`AUTH`}
            avatar={`img/avatar.jpg`}
            genres={genres}
            promoMovie={promoMovie}
            movies={showedMovies}
            moviesCount={4}
            onGenreClick={() => {}}
            onMovieCardClick={() => {}}
            onPlayButtonClick={onPlayButtonClick}
            onShowMoreButtonClick={() => {}}
          />
        </Provider>
    );
    const playButton = mainElement.find(`.btn--play`);
    playButton.simulate(`click`, {preventDefault: () => {}});
    expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
  });

});
