import * as React from "react";
import {Router} from "react-router-dom";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import MovieCard from "./movie-card";
import history from "../../history";
import {testMovies} from "../../test-mocks/test-films";

configure({
  adapter: new Adapter()
});

const movie = testMovies[3];

describe(`MovieCardComponent`, () => {
  it(`should run callback on Mouse Entering the film card`, () => {
    const onCardEnter = jest.fn();
    const wrapper = mount(
        <Router history={history}>
          <MovieCard
            movie={movie}
            onCardClick={() => {}}
            onCardEnter={onCardEnter}
            onCardLeave={() => {}}
          >
            <video/>
          </MovieCard>
        </Router>
    );

    const movieCard = wrapper.find(`.small-movie-card`);
    movieCard.simulate(`mouseenter`);
    expect(onCardEnter).toHaveBeenCalledTimes(1);
  });

  it(`should run callback on image click`, () => {
    const onCardClick = jest.fn();
    const wrapper = mount(
        <Router history={history}>
          <MovieCard
            movie={movie}
            onCardEnter={() => {}}
            onCardLeave={()=>{}}
            onCardClick={onCardClick}
          >
            <video/>
          </MovieCard>
        </Router>
    );

    const imageWrapperElement = wrapper.find(`a.small-movie-card__image`);

    imageWrapperElement.simulate(`click`);
    expect(onCardClick).toHaveBeenCalledTimes(1);
  });

  it(`should run callback on title click`, () => {
    const onCardClick = jest.fn();
    const wrapper = mount(
        <Router history={history}>
          <MovieCard
            movie={movie}
            onCardEnter={() => {}}
            onCardClick={onCardClick}
            onCardLeave={()=>{}}
          >
            <video/>
          </MovieCard>
        </Router>
    );

    const titleElement = wrapper.find(`a.small-movie-card__link`);

    titleElement.simulate(`click`);
    expect(onCardClick).toHaveBeenCalledTimes(1);
  });
});
