import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import App from "./app.jsx";
import {testMovies} from "../../test-mocks/test-films";

const mockStore = configureStore([]);

const headerMovie = testMovies[0];

describe(`App Component`, () => {
  it(`Should render Jurassic Park in header`, () => {
    const store = mockStore({
      moviesCount: 4,
      genre: `All movies`,
      movies: testMovies,
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            headerMovie={headerMovie}
            movies={testMovies}
            onGenreClick={() =>{}}
            onShowMoreButtonClick={() => {}}
          />
        </Provider>
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
