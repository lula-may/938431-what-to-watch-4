import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MoviesList from "./movies-list.jsx";
import {testMovies} from "../../test-mocks/test-films";

configure({
  adapter: new Adapter()
});
describe(`MoviesList Component`, () => {
  it(`should return movie object to callback on card image click`, () => {
    const movie = testMovies[2];
    const onMovieCardClick = jest.fn((...args) => [...args]);
    const moviesList = mount(
        <MoviesList
          movies={testMovies}
          onMovieCardClick={onMovieCardClick}
        />
    );

    const cardImage = moviesList.find(`.small-movie-card__image`).at(2);
    cardImage.simulate(`click`, {});

    expect(onMovieCardClick.mock.calls[0][0]).toMatchObject(movie);
  });

  it(`should return movie object to callback on card title click`, () => {
    const movie = testMovies[2];
    const onMovieCardClick = jest.fn((...args) => [...args]);
    const moviesList = mount(
        <MoviesList
          movies={testMovies}
          onMovieCardClick={onMovieCardClick}
        />
    );

    const cardTitle = moviesList.find(`.small-movie-card__title`).at(2);
    cardTitle.simulate(`click`, {});

    expect(onMovieCardClick.mock.calls[0][0]).toMatchObject(movie);
  });

  it(`should pass movie object to the State.movie on mouseEntering the movieCard`, () => {
    const movie = testMovies[2];
    const onMouseEnter = jest.fn();
    const moviesList = mount(
        <MoviesList
          movies={testMovies}
          onMovieCardClick={() => {}}
          onMouseEnter={onMouseEnter}
        />
    );

    const card = moviesList.find(`.small-movie-card`).at(2);
    card.simulate(`mouseenter`, {});

    expect(moviesList.state().movie).toMatchObject(movie);
  });

});


