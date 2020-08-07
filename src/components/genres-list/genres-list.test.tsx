import * as React from "react";
import * as renderer from "react-test-renderer";

import GenresList from "./genres-list";
import {noop} from "../../utils";

const activeItem = `War`;
const genres: string[] = [`All genres`, `Sci-Fi`, `War`, `Detective`, `Fantasy`, `Sport`, `Adventure`];

it(`should render correctly GenresList Component, "War" with active class`, () => {
  const tree = renderer.create(
      <GenresList
        activeItem={activeItem}
        genres={genres}
        onClick={noop}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
