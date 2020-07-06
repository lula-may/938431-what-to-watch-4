import React from "react";
import renderer from "react-test-renderer";
import {GenresList} from "./genres-list.jsx";

const genres = [`Sci-Fi`, `War`, `Detective`, `Fantasy`, `Sport`, `Adventure`];

it(`should render correctly GenresList Component, "War" with active class`, () => {
  const tree = renderer.create(
      <GenresList
        activeGenre={`War`}
        genres={genres}
        onGenreClick={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
