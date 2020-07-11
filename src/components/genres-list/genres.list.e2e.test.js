import React from "react";
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenresList from "./genres-list.jsx";
import {testMovies} from "../../test-mocks/test-films.js";

configure({
  adapter: new Adapter(),
});

describe(`GenresList Component`, () => {
  it(`should pass "War" genre to callback on War tab click`, () => {
    const onClick = jest.fn();
    const genresList = shallow(
        <GenresList
          activeItem={`All genres`}
          movies={testMovies}
          onClick={onClick}
        />
    );

    const warTabLink = genresList.find(`#War`);

    warTabLink.simulate(`click`, {preventDefault: () => {}});
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
