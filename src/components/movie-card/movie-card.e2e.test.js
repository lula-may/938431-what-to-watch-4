import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";
import {testMovies} from "../../test-mocks/test-films";

configure({
  adapter: new Adapter()
});

const movie = testMovies[3];

describe(`MovieCardComponent`, () => {
  it(`should Movie object be supplied to callback on Mouse Entering the film card`, () => {
    const onMouseEnter = jest.fn((...args) => [...args]);
    const movieCard = shallow(
        <MovieCard
          movie={movie}
          onMouseEnter={onMouseEnter}
          onCardClick={() => {}}
          renderVideo={() => {}}
        />
    );

    movieCard.simulate(`mouseenter`);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseEnter.mock.calls[0][0]).toMatchObject(movie);
  });

  it(`should run callback on image click`, () => {
    const onCardClick = jest.fn();
    const movieCard = shallow(
        <MovieCard
          movie={movie}
          onMouseEnter={() => {}}
          onCardClick={onCardClick}
          renderVideo={() => {}}
        />
    );

    const imageWrapperElement = movieCard.find(`div.small-movie-card__image`);

    imageWrapperElement.simulate(`click`);
    expect(onCardClick).toHaveBeenCalledTimes(1);
  });

  it(`should run callback on title click`, () => {
    const onCardClick = jest.fn();
    const movieCard = shallow(
        <MovieCard
          movie={movie}
          onMouseEnter={() => {}}
          onCardClick={onCardClick}
          renderVideo={() => {}}
        />
    );

    const titleElement = movieCard.find(`h3`);

    titleElement.simulate(`click`);
    expect(onCardClick).toHaveBeenCalledTimes(1);
  });
});
