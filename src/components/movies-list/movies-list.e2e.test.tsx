import * as React from "react";
import {Router} from "react-router-dom";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import MoviesList from "./movies-list";
import history from "../../history";
import {testMovies} from "../../test-mocks/test-films";

configure({
  adapter: new Adapter()
});

describe(`MoviesList Component`, () => {
  it(`should run callback on card image click`, () => {
    const onMovieCardClick = jest.fn();
    const moviesList = mount(
        <Router history={history}>
          <MoviesList
            movies={testMovies}
            moviesCount={8}
            onMovieCardClick={onMovieCardClick}
          />
        </Router>
    );

    const cardImage = moviesList.find(`.small-movie-card__image`).at(2);
    cardImage.simulate(`click`, {});

    expect(onMovieCardClick).toHaveBeenCalledTimes(1);
  });

  it(`should run callback on card title click`, () => {
    const onMovieCardClick = jest.fn();
    const moviesList = mount(
        <Router history={history}>
          <MoviesList
            movies={testMovies}
            moviesCount={8}
            onMovieCardClick={onMovieCardClick}
          />
        </Router>
    );

    const cardTitle = moviesList.find(`a.small-movie-card__link`).at(2);
    cardTitle.simulate(`click`, {});

    expect(onMovieCardClick).toHaveBeenCalledTimes(1);
  });
});


