import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {App} from "./app.jsx";
import Main from "../main/main.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import Player from "../player/player.jsx";
import {testMovies} from "../../test-mocks/test-films";

configure({
  adapter: new Adapter(),
});

const headerMovie = testMovies[0];

describe(`App Component`, () => {
  it(`should render Player Component on Play button click in Main Component`, () => {
    const wrapper = mount(
        <App
          activeGenre={`All genres`}
          headerMovie={headerMovie}
          movies={testMovies}
          moviesCount={4}
          onGenreClick={() =>{}}
          onShowMoreButtonClick={() => {}}
        />
    );
    const playButton = wrapper.find(`.btn--play`);

    expect(wrapper.find(Player).length).toBe(0);

    playButton.simulate(`click`);
    expect(wrapper.find(Player).length).toBe(1);
  });


  it(`should replace Player Component by Main Component on Exit button click`, () => {
    const wrapper = mount(
        <App
          activeGenre={`All genres`}
          headerMovie={headerMovie}
          movies={testMovies}
          moviesCount={4}
          onGenreClick={() =>{}}
          onShowMoreButtonClick={() => {}}
        />
    );
    const playButton = wrapper.find(`.btn--play`);

    playButton.simulate(`click`);
    expect(wrapper.find(Player).length).toBe(1);
    expect(wrapper.find(Main).length).toBe(0);

    const exitButton = wrapper.find(`.player__exit`);

    exitButton.simulate(`click`);
    expect(wrapper.find(Player).length).toBe(0);
    expect(wrapper.find(Main).length).toBe(1);
  });

  it(`should render Player Component on Play button click in MovieDetails Component`, () => {
    const wrapper = mount(
        <App
          activeGenre={`All genres`}
          headerMovie={headerMovie}
          movies={testMovies}
          moviesCount={4}
          onGenreClick={() =>{}}
          onShowMoreButtonClick={() => {}}
        />
    );

    wrapper.setState({
      page: `details`,
      movie: testMovies[1],
    });

    const playButton = wrapper.find(`.btn--play`);
    expect(wrapper.find(MovieDetails).length).toBe(1);
    expect(wrapper.find(Player).length).toBe(0);

    playButton.simulate(`click`);
    expect(wrapper.find(MovieDetails).length).toBe(0);
    expect(wrapper.find(Player).length).toBe(1);
  });

  it(`should replace Player Component by MovieDetails Component on Exit button click`, () => {
    const wrapper = mount(
        <App
          activeGenre={`All genres`}
          headerMovie={headerMovie}
          movies={testMovies}
          moviesCount={4}
          onGenreClick={() =>{}}
          onShowMoreButtonClick={() => {}}
        />
    );

    wrapper.setState({
      page: `details`,
      movie: testMovies[1],
    });

    const playButton = wrapper.find(`.btn--play`);

    playButton.simulate(`click`);
    expect(wrapper.find(Player).length).toBe(1);
    expect(wrapper.find(MovieDetails).length).toBe(0);

    const exitButton = wrapper.find(`.player__exit`);

    exitButton.simulate(`click`);
    expect(wrapper.find(Player).length).toBe(0);
    expect(wrapper.find(MovieDetails).length).toBe(1);
  });
});
