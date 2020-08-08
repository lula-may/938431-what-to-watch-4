import * as React from "react";
import {shallow, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import {noop} from "../../utils";
import GenresList from "./genres-list";

configure({
  adapter: new Adapter(),
});

const genres: string[] = [`All genres`, `Sci-Fi`, `War`, `Detective`, `Fantasy`, `Sport`, `Adventure`];
const activeItem = `All genres`;

describe(`GenresList Component`, () => {
  it(`should run callback on War tab click`, () => {
    const onClick = jest.fn();
    const genresList = shallow(
        <GenresList
          activeItem={activeItem}
          genres={genres}
          onClick={onClick}
        />
    );

    const warTabLink = genresList.find(`#War`);

    warTabLink.simulate(`click`, {preventDefault: noop});
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
