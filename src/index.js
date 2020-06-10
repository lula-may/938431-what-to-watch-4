import React from "react";
import ReactDom from "react-dom";
import {App} from "./components/app.jsx";

const filmData = {
  filmTitle: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseYear: `2014`
};

const init = (settings) => {
  const {filmTitle, genre, releaseYear} = settings;

  ReactDom.render(
      <App
        filmTitle={filmTitle}
        genre={genre}
        releaseYear={releaseYear}
      />,
      document.querySelector(`#root`)
  );
};

init(filmData);
