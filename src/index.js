import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";
import {movies, promoMovie} from "./mocks/films";

const init = () => {

  ReactDom.render(
      <App
        headerMovie={promoMovie}
        movies={movies}
      />,
      document.querySelector(`#root`)
  );
};

init();
