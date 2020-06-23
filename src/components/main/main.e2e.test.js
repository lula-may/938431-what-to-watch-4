import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";
import {testMovies} from "../../test-mocks/test-films";

Enzyme.configure({
  adapter: new Adapter()
});

const headerMovie = testMovies[0];
const movies = testMovies.slice(1);

describe(`MainComponent`, () => {
  it(`Should run callback on every movie title click`, () => {
    const onMovieCardClick = jest.fn();
    const mainElement = mount(
        <Main
          headerMovie={headerMovie}
          movies={movies}
          onMovieCardClick={onMovieCardClick}
        />
    );
    const titleElements = mainElement.find(`h3.small-movie-card__title`);
    titleElements.forEach((element) => element.simulate(`click`, {}));
    expect(onMovieCardClick).toHaveBeenCalledTimes(movies.length);
  });
});
