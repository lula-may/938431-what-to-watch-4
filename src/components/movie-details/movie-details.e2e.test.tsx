import * as React from "react";
import {Router} from "react-router-dom";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import {AuthorizationStatus} from "../../reducer/user/user";
import {MovieDetails} from "./movie-details";
import history from "../../history";
import {Movie, Review} from "../../types";
import {noop} from "../../utils";
import {testMovies} from "../../test-mocks/test-films";

configure({
  adapter: new Adapter(),
});

const avatar = `avatar.jpg`;
const movie: Movie = testMovies[1];
const similarMovies: Array<Movie> = testMovies.slice(2);
const comments: Array<Review | null> = [];

describe(`MovieDetails Component`, () => {
  it(`should run callback on every SimilarMovie card click`, () => {
    const onMovieCardClick = jest.fn();
    const wrapper = mount(
        <Router history={history}>
          <MovieDetails
            authorizationStatus={AuthorizationStatus.AUTH}
            avatar={avatar}
            comments={comments}
            hasLoadingError={false}
            loadComments={noop}
            movie={movie}
            onMovieCardClick={onMovieCardClick}
            onMyListButtonClick={noop}
            setActiveMovie={noop}
            similarMovies={similarMovies}
          />
        </Router>
    );
    const movieCards = wrapper.find(`a.small-movie-card__image`);

    movieCards.forEach((card) => card.simulate(`click`));
    expect(onMovieCardClick).toHaveBeenCalledTimes(4);
  });

  it(`should run callback on MyList button click`, () => {
    const onMyListButtonClick = jest.fn();
    const wrapper = mount(
        <Router history={history}>
          <MovieDetails
            authorizationStatus={`AUTH`}
            avatar={`avatar.jpg`}
            comments={comments}
            hasLoadingError={false}
            loadComments={noop}
            movie={movie}
            onMovieCardClick={noop}
            onMyListButtonClick={onMyListButtonClick}
            setActiveMovie={noop}
            similarMovies={similarMovies}
          />
        </Router>
    );
    const myListButton = wrapper.find(`.btn--list`);

    myListButton.simulate(`click`);
    expect(onMyListButtonClick).toHaveBeenCalledTimes(1);
  });
});
