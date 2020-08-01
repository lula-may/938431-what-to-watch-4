import React from "react";
import {Router} from "react-router-dom";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MovieDetails} from "./movie-details.jsx";
import history from "../../history.js";
import {testMovies} from "../../test-mocks/test-films.js";

configure({
  adapter: new Adapter(),
});

const movie = testMovies[1];
const promoMovie = testMovies[0];
const similarMovies = testMovies.slice(2);

describe(`MovieDetails Component`, () => {
  it(`should run callback on every SimilarMovie card click`, () => {
    const onMovieCardClick = jest.fn();
    const wrapper = mount(
        <Router history={history}>
          <MovieDetails
            authorizationStatus={`AUTH`}
            avatar={`avatar.jpg`}
            hasLoadingError={false}
            loadComments={() => {}}
            movie={movie}
            onLogoLinkClick={() => {}}
            onMovieCardClick={onMovieCardClick}
            onMyListButtonClick={() => {}}
            onPlayButtonClick={() => {}}
            promoMovie={promoMovie}
            setActiveMovie={() => {}}
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
            hasLoadingError={false}
            loadComments={() => {}}
            movie={movie}
            onLogoLinkClick={() => {}}
            onMovieCardClick={() => {}}
            onMyListButtonClick={onMyListButtonClick}
            promoMovie={promoMovie}
            setActiveMovie={() => {}}
            similarMovies={similarMovies}
          />
        </Router>
    );
    const myListButton = wrapper.find(`.btn--list`);

    myListButton.simulate(`click`);
    expect(onMyListButtonClick).toHaveBeenCalledTimes(1);
  });
});
