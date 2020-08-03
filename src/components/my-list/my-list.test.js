import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";

import {MyList} from "./my-list.jsx";
import history from "../../history.js";
import {testMovies} from "../../test-mocks/test-films.js";

const movies = testMovies.slice(0, 3);

describe(`MyList Component`, () => {
  it(`should render correctly MyList component`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <MyList
            avatarUrl={`avatar.jpg`}
            favoriteMovies={movies}
            hasFavoriteLoadingError={false}
            isLoading={false}
            loadFavoriteMovies={() => {}}
            onMovieCardClick={() => {}}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Loading message`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <MyList
            avatarUrl={`avatar.jpg`}
            favoriteMovies={[]}
            hasFavoriteLoadingError={false}
            isLoading={true}
            loadFavoriteMovies={() => {}}
            onMovieCardClick={() => {}}
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
            loadFavoriteMovies={() => {}}
            onMovieCardClick={() => {}}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
