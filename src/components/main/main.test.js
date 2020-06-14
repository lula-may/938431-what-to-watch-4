import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const movies = [
  `Gone With The Wind`,
  `The Godfather`,
  `Casablanca`,
  `A Streetcar Named Desire`,
  `Some Likes It Hot`,
];

const title = `Jurassic Park`;
const genre = `Sci-Fi`;
const year = 1993;

it(`Should render Jurassik Park`, () => {
  const tree = renderer.create(
      <Main
        headerMovieTitle={title}
        headerMovieGenre={genre}
        headerMovieYear={year}
        movieTitles={movies}
      />
  )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
