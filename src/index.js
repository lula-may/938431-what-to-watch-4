import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";
import {headerMovie, movies} from "./mocks/films";


const init = () => {

  ReactDom.render(
      <App
        headerMovie={headerMovie}
        movies={movies}
      />,
      document.querySelector(`#root`)
  );
};

init();
