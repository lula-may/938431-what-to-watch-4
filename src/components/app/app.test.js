import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const movieTitles = [
  `Gone With The Wind`,
  `The Godfather`,
  `Casablanca`,
  `A Streetcar Named Desire`,
  `Some Likes It Hot`,
];

const movies = movieTitles.map((title, i) => {
  return {
    title,
    id: i
  };
});

const title = `Jurassic Park`;
const genre = `Sci-Fi`;
const year = 1993;

it(`Should render Jurassic Park in header`, () => {
  const tree = renderer.create(
      <App
        headerMovieTitle={title}
        genre={genre}
        releaseYear={year}
        movies={movies}
      />
  )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
