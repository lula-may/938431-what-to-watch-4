import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MoviesList from "./movies-list.jsx";
import {testMovies} from "../../test-mocks/test-films";

configure({
  adapter: new Adapter()
});

it(`should movie object be supplied to callback on card image or title click`, () => {
  const movie = testMovies[2];
  const onMovieTitleClick = jest.fn((...args) => [...args]);
  const moviesList = mount(
      <MoviesList
        movies={testMovies}
        onMovieTitleClick={onMovieTitleClick}
      />
  );

  const cardImage = moviesList.find(`.small-movie-card__image`).at(2);
  const cardTitle = moviesList.find(`.small-movie-card__title`).at(2);

  cardImage.simulate(`click`, {});
  cardTitle.simulate(`click`, {});

  expect(onMovieTitleClick.mock.calls[0][0]).toMatchObject(movie);
  expect(onMovieTitleClick.mock.calls[1][0]).toMatchObject(movie);
});
