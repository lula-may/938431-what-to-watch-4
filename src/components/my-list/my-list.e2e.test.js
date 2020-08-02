import React from "react";
import {Router} from "react-router-dom";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {MyList} from "./my-list.jsx";
import history from "../../history.js";
import {testMovies} from "../../test-mocks/test-films.js";

configure({
  adapter: new Adapter(),
});
const favoriteMovies = testMovies.slice(0, 3);
const avatar = `avatar.jpg`;

describe(`MyList Component`, () => {
  it(`should pass movie to callback on Movie Card click`, () => {
    const onMovieCardClick = jest.fn((...args) => [...args]);
    const wrapper = mount(
        <Router history={history}>
          <MyList
            avatarUrl={avatar}
            favoriteMovies={favoriteMovies}
            onMovieCardClick={onMovieCardClick}
          />
        </Router>
    );

    const secondCard = wrapper.find(`a.small-movie-card__image`).at(1);

    secondCard.simulate(`click`);
    expect(onMovieCardClick).toHaveBeenCalledTimes(1);
    expect(onMovieCardClick).toHaveBeenCalledWith(favoriteMovies[1]);
  });
});
