import React from "react";
import renderer from "react-test-renderer";
import {GenresList} from "./genres-list.jsx";

import {testMovies} from "../../test-mocks/test-films.js";

it(`should render correctly GenresList Component, "War" with active class`, () => {
  const tree = renderer.create(
      <GenresList
        activeGenre={`War`}
        movies={testMovies}
        onGenreClick={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
