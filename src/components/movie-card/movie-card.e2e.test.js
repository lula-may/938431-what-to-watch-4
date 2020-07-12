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
  it(`should run callback on Mouse Entering the film card`, () => {
    const onMouseEnter = jest.fn();
    const movieCard = shallow(
        <MovieCard
          movie={movie}
          onCardClick={() => {}}
          onMouseEnter={onMouseEnter}
          onMouseLeave={() => {}}
          renderPlayer={() => {}}
        >
          <video/>
        </MovieCard>
    );

    movieCard.simulate(`mouseenter`);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it(`should run callback on image click`, () => {
    const onCardClick = jest.fn();
    const movieCard = shallow(
        <MovieCard
          movie={movie}
          onMouseEnter={() => {}}
          onMouseLeave={()=>{}}
          onCardClick={onCardClick}
          renderPlayer={() => {}}
        >
          <video/>
        </MovieCard>
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
          onMouseLeave={()=>{}}
          renderPlayer={() => {}}
        >
          <video/>
        </MovieCard>
    );

    const titleElement = movieCard.find(`h3`);

    titleElement.simulate(`click`);
    expect(onCardClick).toHaveBeenCalledTimes(1);
  });
});
