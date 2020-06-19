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

const headerMovieTitle = `The Grand Budapest Hotel`;

const transformToKebabCase = (phrase) => {
  return phrase.toLowerCase().replace(`:`, ``).split(` `).join(`-`);
};

const getPosterSrc = (title) => {
  return `img/${transformToKebabCase(title)}-poster.jpg`;
};

const getBgSrc = (title) => {
  return `img/bg-${transformToKebabCase(title)}.jpg`;
};

const getImgSrc = (movie) => `img/${transformToKebabCase(movie)}.jpg`;

const movies = movieTitles.map((title, i) => {
  return {
    id: i,
    title,
    src: getImgSrc(title)
  };
});

const headerMovie = {
  title: headerMovieTitle,
  genre: `Drama`,
  releaseYear: 2014,
  bg: getBgSrc(headerMovieTitle),
  poster: getPosterSrc(headerMovieTitle)
};

export {headerMovie, movies};
