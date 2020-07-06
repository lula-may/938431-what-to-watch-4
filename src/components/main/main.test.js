import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import Main from "./main.jsx";
import {testMovies} from "../../test-mocks/test-films";

const mockStore = configureStore([]);

const headerMovie = testMovies[0];
const showedMovies = testMovies.slice(0, 8);

describe(`Main Component`, () => {
  it(`Should render Jurassik Park in header`, () => {
    const store = mockStore({
      allMovies: testMovies,
      genre: `All genres`,
      showedMovies,
    });

    const tree = renderer.create(
        <Provider store={store}>
          <Main
            headerMovie={headerMovie}
            movies={testMovies}
            onMovieCardClick={() => {}}
          />
        </Provider>
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
