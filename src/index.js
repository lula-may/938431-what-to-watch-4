import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";

const movieTitles = [
  `Fantastic Beasts: The Crimes of Grindelwald`,
  `Bohemian Rhapsody`,
  `Macbeth`,
  `Aviator`,
  `We need to talk about Kevin`,
  `What We Do in the Shadows`,
  `Revenant`,
  `Johnny English`,
  `Shutter Island`,
  `Pulp Fiction`,
  `No Country for Old Men`,
  `Snatch`,
  `Moonrise Kingdom`,
  `Seven Years in Tibet`,
  `Midnight Special`,
  `War of the Worlds`,
  `Dardjeeling Limited`,
  `Orlando`,
  `Mindhunter`,
  `Midnight Special`
];

const mainPageData = {
  headerMovieTitle: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseYear: 2014,
  movies: movieTitles
};

const init = (settings) => {
  const {headerMovieTitle, genre, releaseYear, movies} = settings;

  ReactDom.render(
      <App
        headerMovieTitle={headerMovieTitle}
        genre={genre}
        releaseYear={releaseYear}
        movies={movies}
      />,
      document.querySelector(`#root`)
  );
};

init(mainPageData);
