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
        authorizationStatus: `AUTH`,
        genre: `All movies`,
        hasFilmsLoadingError: false,
        hasUploadingError: false,
        isLoading: false,
        isUploading: false,
        movies: testMovies,
        promoMovie,
      },
      [NameSpace.APP_STATE]: {
        moviesCount: 4,
        page: `main`,
        previousPage: undefined,
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
            authorizationStatus={`AUTH`}
            hasFilmsLoadingError={false}
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
        hasFilmsLoadingError: false,
        hasUploadingError: false,
        isUploading: false,
        isLoading: false,
        movies: testMovies,
        promoMovie,
      },
      [NameSpace.APP_STATE]: {
        moviesCount: 4,
        page: `details`,
        previousPage: undefined,
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
            authorizationStatus={`AUTH`}
            hasFilmsLoadingError={false}
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
        hasFilmsLoadingError: false,
        hasUploadingError: false,
        isLoading: false,
        isUploading: false,
        movies: testMovies,
        promoMovie,
      },
      [NameSpace.APP_STATE]: {
        moviesCount: 4,
        page: `player`,
        previousPage: undefined,
      },
      [NameSpace.USER]: {
        authorizationStatus: `AUTH`,
        avatarUrl: `img/avatar.jpg`,
        hasLoginError: false,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            authorizationStatus={`AUTH`}
            hasFilmsLoadingError={false}
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

  it(`Should render ErrorScreen Component`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        activeMovie: promoMovie,
        genre: `All movies`,
        hasFilmsLoadingError: true,
        hasUploadingError: false,
        isLoading: false,
        isUploading: false,
        movies: testMovies,
        promoMovie,
      },
      [NameSpace.APP_STATE]: {
        moviesCount: 4,
        page: `main`,
        previousPage: undefined,
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
            authorizationStatus={`NO_AUTH`}
            hasFilmsLoadingError={true}
            isLoading={false}
            onExitButtonClick={() => {}}
            page={`main`}
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
        activeMovie: promoMovie,
        genre: `All movies`,
        hasFilmsLoadingError: false,
        hasUploadingError: false,
        isLoading: true,
        isUploading: false,
        movies: testMovies,
        promoMovie,
      },
      [NameSpace.APP_STATE]: {
        moviesCount: 4,
        page: `main`,
        previousPage: undefined,
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
            authorizationStatus={`NO_AUTH`}
            hasFilmsLoadingError={false}
            isLoading={true}
            onExitButtonClick={() => {}}
            page={`main`}
          />
        </Provider>, {createNodeMock: () => {
          return {};
        }}
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`Should render SignIn Component`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        activeMovie: promoMovie,
        genre: `All movies`,
        hasFilmsLoadingError: false,
        hasUploadingError: false,
        isLoading: false,
        isUploading: false,
        movies: testMovies,
        promoMovie,
      },
      [NameSpace.APP_STATE]: {
        moviesCount: 4,
        page: `main`,
        previousPage: undefined,
      },
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
        avatarUrl: `img/avatar.jpg`,
        hasLoginError: false,
        isInvalidEmail: false,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            authorizationStatus={`NO_AUTH`}
            hasFilmsLoadingError={false}
            isLoading={false}
            onExitButtonClick={() => {}}
            page={`signIn`}
          />
        </Provider>, {createNodeMock: () => {
          return {};
        }}
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`Should render AddReview Component`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        activeMovie: promoMovie,
        genre: `All movies`,
        hasFilmsLoadingError: false,
        hasUploadingError: false,
        isLoading: false,
        isUploading: false,
        movies: testMovies,
        promoMovie,
      },
      [NameSpace.APP_STATE]: {
        moviesCount: 4,
        page: `add-review`,
        previousPage: undefined,
      },
      [NameSpace.USER]: {
        authorizationStatus: `AUTH`,
        avatarUrl: `img/avatar.jpg`,
        hasUploadingError: false,
        hasLoginError: false,
        isInvalidEmail: false,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            authorizationStatus={`NO_AUTH`}
            hasFilmsLoadingError={false}
            isLoading={false}
            onExitButtonClick={() => {}}
            page={`add-review`}
          />
        </Provider>, {createNodeMock: () => {
          return {};
        }}
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
