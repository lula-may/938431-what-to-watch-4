import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropTypes from "prop-types";
import withActiveMovie from "./with-active-movie.jsx";
import {testMovies} from "../../test-mocks/test-films";

configure({
  adapter: new Adapter()
});

const movie = testMovies[0];

const MockComponent = (props) => {
  const {onMovieCardClick, onMovieCardEnter} = props;
  return <div
    id="mock"
    onClick={onMovieCardClick}
    movie={movie}
    onMouseEnter={() => onMovieCardEnter(movie)}
  />;
};
MockComponent.propTypes = {
  onMovieCardClick: PropTypes.func.isRequired,
  onMovieCardEnter: PropTypes.func.isRequired,
};

const WithActiveMovie = withActiveMovie(MockComponent);

describe(`WithActiveMovie HOC`, () => {
  it(`should get movie from mockComponent on mouse entering and pass it to callback on mockComponent click`, () => {
    const onMovieCardClick = jest.fn((...args) => [...args]);
    const wrapper = mount(
        <WithActiveMovie
          onMovieCardClick={onMovieCardClick}
        />
    );
    wrapper.find(`#mock`).simulate(`mouseenter`);
    wrapper.find(`#mock`).simulate(`click`);
    expect(onMovieCardClick.mock.calls[0][0]).toEqual(movie);
  });
});
