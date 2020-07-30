import React from "react";
import {configure, mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MovieDetails} from "./movie-details.jsx";
import {testMovies} from "../../test-mocks/test-films.js";

configure({
  adapter: new Adapter(),
});

const movie = testMovies[0];
const similarMovies = testMovies.slice(1);

describe(`MovieDetails Component`, () => {
  it(`should run callback on AddReview Button click`, () => {
    const onAddReviewButtonClick = jest.fn();
    const wrapper = shallow(
        <MovieDetails
          authorizationStatus={`AUTH`}
          avatar={`avatar.jpg`}
          hasLoadingError={false}
          movie={movie}
          onAddReviewButtonClick={onAddReviewButtonClick}
          onMovieCardClick={() => {}}
          onPlayButtonClick={() => {}}
          similarMovies={similarMovies}
        />
    );

    const addReviewButton = wrapper.find(`a.movie-card__button`);

    addReviewButton.simulate(`click`, {preventDefault: () => {}});
    expect(onAddReviewButtonClick).toHaveBeenCalledTimes(1);
  });

  it(`should run callback on Play Button click`, () => {
    const onPlayButtonClick = jest.fn();
    const wrapper = shallow(
        <MovieDetails
          authorizationStatus={`AUTH`}
          avatar={`avatar.jpg`}
          hasLoadingError={false}
          movie={movie}
          onAddReviewButtonClick={() => {}}
          onMovieCardClick={() => {}}
          onPlayButtonClick={onPlayButtonClick}
          similarMovies={similarMovies}
        />
    );

    const playButton = wrapper.find(`.btn--play`);

    playButton.simulate(`click`);
    expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
  });

  it(`should run callback on every SimilarMovie card click`, () => {
    const onMovieCardClick = jest.fn();
    const wrapper = mount(
        <MovieDetails
          authorizationStatus={`AUTH`}
          avatar={`avatar.jpg`}
          hasLoadingError={false}
          movie={movie}
          onAddReviewButtonClick={() => {}}
          onMovieCardClick={onMovieCardClick}
          onPlayButtonClick={() => {}}
          similarMovies={similarMovies}
        />
    );
    const movieCards = wrapper.find(`.small-movie-card__image`);

    movieCards.forEach((card) => card.simulate(`click`));
    expect(onMovieCardClick).toHaveBeenCalledTimes(4);
  });

});
