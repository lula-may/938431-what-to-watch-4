import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {Router} from "react-router-dom";

import {AuthorizationStatus} from "../../reducer/user/user";
import history from "../../history";
import {Main} from "./main";
import {Movie} from "../../types";
import {noop} from "../../utils";
import {testMovies} from "../../test-mocks/test-films";

configure({
  adapter: new Adapter()
});

const activeGenre = `All genres`;
const avatar = `img/avatar.jpg`;
const promoMovie: Movie = testMovies[0];
const showedMovies: Array<Movie> = testMovies.slice(1);
const genres: string[] = [`All genres`, `Sci-Fi`, `War`, `Detective`, `Fantasy`, `Sport`, `Adventure`];

describe(`MainComponent`, () => {
  it(`should run callback on tab click`, () => {
    const onGenreClick = jest.fn();
    const mainElement = mount(
        <Router history={history}>
          <Main
            activeGenre={activeGenre}
            authorizationStatus={AuthorizationStatus.AUTH}
            avatar={avatar}
            genres={genres}
            hasUploadingError={false}
            isUploading={false}
            movies={showedMovies}
            moviesCount={8}
            onGenreClick={onGenreClick}
            onMovieCardClick={noop}
            onShowMoreButtonClick={noop}
            onMyListButtonClick={noop}
            promoMovie={promoMovie}
          />
        </Router>
    );
    const genreLink = mainElement.find(`.catalog__genres-link`).at(1);

    genreLink.simulate(`click`, {preventDefault: noop});
    expect(onGenreClick).toHaveBeenCalledTimes(1);
  });

  it(`should run callback on Show More button click`, () => {
    const onShowMoreButtonClick = jest.fn();
    const mainElement = mount(
        <Router history={history}>
          <Main
            activeGenre={activeGenre}
            authorizationStatus={AuthorizationStatus.AUTH}
            avatar={avatar}
            genres={genres}
            hasUploadingError={false}
            isUploading={false}
            movies={showedMovies}
            moviesCount={4}
            onGenreClick={noop}
            onMovieCardClick={noop}
            onShowMoreButtonClick={onShowMoreButtonClick}
            onMyListButtonClick={noop}
            promoMovie={promoMovie}
          />
        </Router>
    );
    const showMoreButton = mainElement.find(`.catalog__button`);

    showMoreButton.simulate(`click`);
    expect(onShowMoreButtonClick).toHaveBeenCalledTimes(1);
  });
});
