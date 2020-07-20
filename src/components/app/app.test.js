import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {App} from "./app.jsx";
import {testMovies} from "../../test-mocks/test-films";

const mockStore = configureStore([]);

const promoMovie = testMovies[0];
const genres = [`All genres`, `Sci-Fi`, `War`, `Detective`, `Fantasy`, `Sport`, `Adventure`];
const similarMovies = testMovies.slice(0, 2);

describe(`App Component`, () => {
  it(`Should render MainComponent`, () => {
    const store = mockStore({
      moviesCount: 4,
      genre: `All movies`,
      movies: testMovies,
      page: `main`,
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            activeMovie={promoMovie}
            activeGenre={`All genres`}
            genres={genres}
            hasErrors={false}
            isLoading={false}
            movies={testMovies}
            moviesCount={4}
            onExitButtonClick={() => {}}
            onGenreClick={() =>{}}
            onCardClick={() => {}}
            onPlayButtonClick={() => {}}
            onShowMoreButtonClick={() => {}}
            page={`main`}
            promoMovie={promoMovie}
            similarMovies={similarMovies}
          />
        </Provider>
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`Should render MovieDetailsComponent`, () => {
    const store = mockStore({
      moviesCount: 4,
      genre: `All movies`,
      movies: testMovies,
      page: `details`,
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            activeMovie={promoMovie}
            activeGenre={`All genres`}
            genres={genres}
            hasErrors={false}
            isLoading={false}
            movies={testMovies}
            moviesCount={4}
            onExitButtonClick={() => {}}
            onGenreClick={() =>{}}
            onCardClick={() => {}}
            onPlayButtonClick={() => {}}
            onShowMoreButtonClick={() => {}}
            page={`details`}
            promoMovie={promoMovie}
            similarMovies={similarMovies}
          />
        </Provider>
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`Should render PlayerComponent`, () => {
    const store = mockStore({
      moviesCount: 4,
      genre: `All movies`,
      movies: testMovies,
      page: `player`,
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            activeMovie={promoMovie}
            activeGenre={`All genres`}
            genres={genres}
            hasErrors={false}
            isLoading={false}
            movies={testMovies}
            moviesCount={4}
            onExitButtonClick={() => {}}
            onGenreClick={() =>{}}
            onCardClick={() => {}}
            onPlayButtonClick={() => {}}
            onShowMoreButtonClick={() => {}}
            page={`player`}
            promoMovie={promoMovie}
            similarMovies={similarMovies}
          />
        </Provider>, {createNodeMock: () => {
          return {};
        }}
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
