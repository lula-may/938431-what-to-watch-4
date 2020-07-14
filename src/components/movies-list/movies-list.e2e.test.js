import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MoviesList from "./movies-list.jsx";
import {testMovies} from "../../test-mocks/test-films";

configure({
  adapter: new Adapter()
});
describe(`MoviesList Component`, () => {
  it(`should run callback on card image click`, () => {
    const onMovieCardClick = jest.fn();
    const moviesList = mount(
        <MoviesList
          movies={testMovies}
          moviesCount={8}
          onMovieCardEnter={() => {}}
          onMovieCardClick={onMovieCardClick}
        />
    );

    const cardImage = moviesList.find(`.small-movie-card__image`).at(2);
    cardImage.simulate(`click`, {});

    expect(onMovieCardClick).toHaveBeenCalledTimes(1);
  });

  it(`should run callback on card title click`, () => {
    const onMovieCardClick = jest.fn();
    const moviesList = mount(
        <MoviesList
          movies={testMovies}
          moviesCount={8}
          onMovieCardEnter={() => {}}
          onMovieCardClick={onMovieCardClick}
        />
    );

    const cardTitle = moviesList.find(`.small-movie-card__title`).at(2);
    cardTitle.simulate(`click`, {});

    expect(onMovieCardClick).toHaveBeenCalledTimes(1);
  });

  it(`should run callback on mouseEntering the movieCard`, () => {
    const onMovieCardEnter = jest.fn();
    const moviesList = mount(
        <MoviesList
          movies={testMovies}
          moviesCount={8}
          onMovieCardClick={() => {}}
          onMovieCardEnter={onMovieCardEnter}
        />
    );

    const card = moviesList.find(`.small-movie-card`).at(2);
    card.simulate(`mouseenter`, {});

    expect(onMovieCardEnter).toHaveBeenCalledTimes(1);
  });
});


