import React from "react";
import renderer from "react-test-renderer";

import GenresList from "./genres-list.jsx";

const genres = [`All genres`, `Sci-Fi`, `War`, `Detective`, `Fantasy`, `Sport`, `Adventure`];

it(`should render correctly GenresList Component, "War" with active class`, () => {
  const tree = renderer.create(
      <GenresList
        activeItem={`War`}
        genres={genres}
        onClick={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
