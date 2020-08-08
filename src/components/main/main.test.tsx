import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import {AuthorizationStatus} from "../../reducer/user/user";
import history from "../../history";
import {Main} from "./main";
import {Movie} from "../../types";
import {noop} from "../../utils";
import {testMovies} from "../../test-mocks/test-films";

const activeGenre = `All genres`;
const avatar = `img/avatar.jpg`;
const genres: string[] = [`All genres`, `Sci-Fi`, `War`, `Detective`, `Fantasy`, `Sport`, `Adventure`];
const movies: Array<Movie> = testMovies;
const promoMovie: Movie = testMovies[0];

describe(`Main Component`, () => {
  it(`Should render correctly MainComponent`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Main
            activeGenre={activeGenre}
            authorizationStatus={AuthorizationStatus.AUTH}
            avatar={avatar}
            genres={genres}
            hasUploadingError={false}
            isUploading={false}
            movies={movies}
            moviesCount={5}
            onGenreClick={noop}
            onMovieCardClick={noop}
            onMyListButtonClick={noop}
            onShowMoreButtonClick={noop}
            promoMovie={promoMovie}
          />
        </Router>
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
