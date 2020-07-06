import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import Main from "./main.jsx";
import {testMovies} from "../../test-mocks/test-films";

Enzyme.configure({
  adapter: new Adapter()
});

const mockStore = configureStore([]);
const headerMovie = testMovies[0];
const showedMovies = testMovies.slice(1);

describe(`MainComponent`, () => {
  it(`Should run callback on every movie title click`, () => {
    const store = mockStore({
      allMovies: testMovies,
      genre: `All genres`,
      showedMovies,
    });
    const onMovieCardClick = jest.fn();

    const mainElement = mount(
        <Provider store={store}>
          <Main
            headerMovie={headerMovie}
            movies={showedMovies}
            onMovieCardClick={onMovieCardClick}
          />
        </Provider>
    );
    const titleElements = mainElement.find(`h3.small-movie-card__title`);
    titleElements.forEach((element) => element.simulate(`click`, {}));
    expect(onMovieCardClick).toHaveBeenCalledTimes(showedMovies.length);
  });
});
