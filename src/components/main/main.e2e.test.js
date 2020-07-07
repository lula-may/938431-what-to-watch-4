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
  it(`Should run callback on every movie title click`, () => {
    const onMovieCardClick = jest.fn();
    const mainElement = mount(
        <Main
          activeGenre={`All genres`}
          headerMovie={headerMovie}
          movies={showedMovies}
          onGenreClick={() =>{}}
          onMovieCardClick={onMovieCardClick}
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
          onGenreClick={onGenreClick}
          onMovieCardClick={() => {}}
        />
    );
    const genreLink = mainElement.find(`.catalog__genres-link`).at(1);

    genreLink.simulate(`click`, {preventDefault: () => {}});
    expect(onGenreClick).toHaveBeenCalledTimes(1);
  });
});
