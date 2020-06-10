import React from "react";
import {Main} from "./main.jsx";

export const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {filmTitle, genre, releaseYear} = props;

  return <Main
    title={filmTitle}
    genre={genre}
    year={releaseYear}
  />;
};
