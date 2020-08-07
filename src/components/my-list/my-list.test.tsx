import * as React from "react";
import {Router} from "react-router-dom";
import * as renderer from "react-test-renderer";

import {MyList} from "./my-list";
import history from "../../history";
import {Movie} from "../../types";
import {noop} from "../../utils";
import {testMovies} from "../../test-mocks/test-films";

const avatarUrl = `avatar.jpg`;
const movies: Array<Movie | null> = testMovies.slice(0, 3);

describe(`MyList Component`, () => {
  it(`should render correctly MyList component`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <MyList
            avatarUrl={avatarUrl}
            favoriteMovies={movies}
            hasFavoriteLoadingError={false}
            isLoading={false}
            loadFavoriteMovies={noop}
            onMovieCardClick={noop}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Loading message`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <MyList
            avatarUrl={avatarUrl}
            favoriteMovies={[]}
            hasFavoriteLoadingError={false}
            isLoading={true}
            loadFavoriteMovies={noop}
            onMovieCardClick={noop}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Error message`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <MyList
            avatarUrl={`avatar.jpg`}
            favoriteMovies={[]}
            hasFavoriteLoadingError={true}
            isLoading={false}
            loadFavoriteMovies={noop}
            onMovieCardClick={noop}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
