import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Main from "./main.jsx";
import {testMovies} from "../../test-mocks/test-films";

Enzyme.configure({
  adapter: new Adapter()
});

const headerMovie = testMovies[0];
const showedMovies = testMovies.slice(1);

describe(`MainComponent`, () => {
  it(`should run callback on every movie title click`, () => {
    const onMovieCardClick = jest.fn();
    const mainElement = mount(
        <Main
          activeGenre={`All genres`}
          headerMovie={headerMovie}
          movies={showedMovies}
          moviesCount={8}
          onGenreClick={() =>{}}
          onMovieCardClick={onMovieCardClick}
          onShowMoreClick={() => {}}
        />
    );
    const titleElements = mainElement.find(`h3.small-movie-card__title`);
    titleElements.forEach((element) => element.simulate(`click`, {}));
    expect(onMovieCardClick).toHaveBeenCalledTimes(showedMovies.length);
  });

  it(`should run callback on tab click`, () => {
    const onGenreClick = jest.fn();
    const mainElement = mount(
        <Main
          activeGenre={`All genres`}
          headerMovie={headerMovie}
          movies={showedMovies}
          moviesCount={8}
          onGenreClick={onGenreClick}
          onMovieCardClick={() => {}}
          onShowMoreClick={() => {}}
        />
    );
    const genreLink = mainElement.find(`.catalog__genres-link`).at(1);

    genreLink.simulate(`click`, {preventDefault: () => {}});
    expect(onGenreClick).toHaveBeenCalledTimes(1);
  });

  it(`should run callback on Show More button click`, () => {
    const onShowMoreClick = jest.fn();
    const mainElement = mount(
        <Main
          activeGenre={`All genres`}
          headerMovie={headerMovie}
          movies={showedMovies}
          moviesCount={4}
          onGenreClick={() => {}}
          onMovieCardClick={() => {}}
          onShowMoreClick={onShowMoreClick}
        />
    );
    const showMoreButton = mainElement.find(`.catalog__button`);

    showMoreButton.simulate(`click`);
    expect(onShowMoreClick).toHaveBeenCalledTimes(1);
  });
});
