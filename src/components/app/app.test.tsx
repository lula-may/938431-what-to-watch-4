import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {App} from "./app";
import NameSpace from "../../reducer/name-space";
import {Movie} from "../../types";
import {testMovies} from "../../test-mocks/test-films";

const mockStore = configureStore([]);

const promoMovie: Movie = testMovies[0];

describe(`App Component`, () => {
  it(`Should render MainComponent`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        hasLoadingError: false,
        hasUploadingError: false,
        isLoading: false,
        isUploading: false,
        movies: testMovies,
        promoMovie,
      },
      [NameSpace.APP_STATE]: {
        activeMovie: promoMovie,
        genre: `All movies`,
        moviesCount: 4,
      },
      [NameSpace.USER]: {
        authorizationStatus: `AUTH`,
        avatarUrl: `img/avatar.jpg`,
        hasLoginError: false,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            hasLoadingError={false}
            isLoading={false}
          />
        </Provider>
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`Should render ErrorScreen Component`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        genre: `All movies`,
        hasLoadingError: true,
        hasUploadingError: false,
        isLoading: false,
        isUploading: false,
        movies: testMovies,
        promoMovie,
      },
      [NameSpace.APP_STATE]: {
        activeMovie: promoMovie,
        genre: `All movies`,
        moviesCount: 4,
      },
      [NameSpace.USER]: {
        authorizationStatus: `AUTH`,
        avatarUrl: `img/avatar.jpg`,
        hasLoginError: false,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            hasLoadingError={true}
            isLoading={false}
          />
        </Provider>, {createNodeMock: () => {
          return {};
        }}
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`Should render LoadingScreen Component`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        hasLoadingError: false,
        hasUploadingError: false,
        isLoading: true,
        isUploading: false,
        movies: testMovies,
        promoMovie,
      },
      [NameSpace.APP_STATE]: {
        moviesCount: 4,
        activeMovie: promoMovie,
        genre: `All movies`,
      },
      [NameSpace.USER]: {
        authorizationStatus: `AUTH`,
        avatarUrl: `img/avatar.jpg`,
        hasLoginError: false,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            hasLoadingError={false}
            isLoading={true}
          />
        </Provider>, {createNodeMock: () => {
          return {};
        }}
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
