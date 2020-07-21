import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {App} from "./app.jsx";
import {testMovies} from "../../test-mocks/test-films";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

const promoMovie = testMovies[0];

describe(`App Component`, () => {
  it(`Should render MainComponent`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        activeMovie: promoMovie,
        genre: `All movies`,
        hasErrors: false,
        isLoading: false,
        movies: testMovies,
        promoMovie,
      },
      [NameSpace.APP_STATE]: {
        moviesCount: 4,
        page: `main`,
        previousPage: undefined,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            hasErrors={false}
            isLoading={false}
            onExitButtonClick={() => {}}
            page={`main`}
          />
        </Provider>
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`Should render MovieDetailsComponent`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        activeMovie: promoMovie,
        genre: `All movies`,
        hasErrors: false,
        isLoading: false,
        movies: testMovies,
        promoMovie,
      },
      [NameSpace.APP_STATE]: {
        moviesCount: 4,
        page: `details`,
        previousPage: undefined,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            hasErrors={false}
            isLoading={false}
            onExitButtonClick={() => {}}
            page={`details`}
          />
        </Provider>
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`Should render PlayerComponent`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        activeMovie: promoMovie,
        genre: `All movies`,
        hasErrors: false,
        isLoading: false,
        movies: testMovies,
        promoMovie,
      },
      [NameSpace.APP_STATE]: {
        moviesCount: 4,
        page: `player`,
        previousPage: undefined,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            hasErrors={false}
            isLoading={false}
            onExitButtonClick={() => {}}
            page={`player`}
          />
        </Provider>, {createNodeMock: () => {
          return {};
        }}
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
