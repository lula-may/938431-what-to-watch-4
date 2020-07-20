import React from "react";
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenresList from "./genres-list.jsx";

configure({
  adapter: new Adapter(),
});

const genres = [`All genres`, `Sci-Fi`, `War`, `Detective`, `Fantasy`, `Sport`, `Adventure`];

describe(`GenresList Component`, () => {
  it(`should run callback on War tab click`, () => {
    const onClick = jest.fn();
    const genresList = shallow(
        <GenresList
          activeItem={`All genres`}
          genres={genres}
          onClick={onClick}
        />
    );

    const warTabLink = genresList.find(`#War`);

    warTabLink.simulate(`click`, {preventDefault: () => {}});
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
