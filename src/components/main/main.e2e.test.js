import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";
import {headerMovie, movies} from "../../test-mocks/test-films";

Enzyme.configure({
  adapter: new Adapter()
});

describe(`MainComponent`, () => {
  it(`Should run callback on every movie title click`, () => {
    const onMovieTitleClick = jest.fn();
    const mainElement = shallow(
        <Main
          headerMovie={headerMovie}
          movies={movies}
          onMovieTitleClick={onMovieTitleClick}
        />
    );
    const titleElements = mainElement.find(`h3.small-movie-card__title`);
    titleElements.forEach((element) => element.simulate(`click`));
    expect(onMovieTitleClick).toHaveBeenCalledTimes(movies.length);
  });
});
