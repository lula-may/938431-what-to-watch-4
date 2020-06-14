import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

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

describe(`MainComponent`, () => {
  it(`Should movie title be pressed`, () => {
    const onMovieTitleClick = jest.fn();
    const mainElement = shallow(
        <Main
          headerMovieTitle={title}
          headerMovieGenre={genre}
          headerMovieYear={year}
          movies={movies}
          onMovieTitleClick={onMovieTitleClick}
        />
    );
    const titleElements = mainElement.find(`h3.small-movie-card__title`);
    titleElements.forEach((element) => element.simulate(`click`));
    expect(onMovieTitleClick).toHaveBeenCalledTimes(movies.length);
  });
});
