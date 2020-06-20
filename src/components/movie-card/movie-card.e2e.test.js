import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";
import {movies} from "../../test-mocks/test-films";

configure({
  adapter: new Adapter()
});

const movie = movies[3];

describe(`MovieCardComponent`, () => {
  it(`should Movie object be supplied to callback on Mouse Entering the film card`, () => {
    const onMouseEnter = jest.fn((...args) => [...args]);
    const movieCard = shallow(
        <MovieCard
          movie={movie}
          onMouseEnter={onMouseEnter}
          onTitleClick={() => {}}
        />
    );

    movieCard.simulate(`mouseenter`);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseEnter.mock.calls[0][0]).toMatchObject(movie);
  });
});
