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

const DIRECTORS = [
  `Martin Scorsese`,
  `Steven Spielberg`,
  `George Lucas`,
  `James Cameron`,
  `Quentin Tarantino`,
  `Christopher Nolan`,
  `Alfred Hitchcock`,
  `Federico Fellini`,
  `Ingmar Bergman`,
  `Andrey Tarkovsky`
];

const ACTORS = [
  `Tom Hanks`,
  `John Malkovich`,
  `Johnny Depp`,
  `Julia Roberts`,
  `Jack Nicholson`,
  `Sigourney Weaver`,
  `Anthony Hopkins`,
  `Natalie Portman`,
  `Jeremy Irons`,
  `Angelina Jolie`,
  `Brad Pitt`,
  `Leonardo Dicaprio`,
  `Robert De Niro`,
  `Will Smith`,
  `Colin Farrell`,
  `Tom Hardy`,
  `Hugh Grant`,
  `Jennifer Lawrence`
];

const DESCRIPTION_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const GENRES = [`Comedy`, `Crime`, `Documentary`, `Drama`, `Horror`, `Kids&Family`, `Romance`, `Sci-Fi`, `Thriller`];

const ACTORS_COUNT = 4;
const PARAGRAPH_COUNT_MIN = 1;
const PARAGRAPH_COUNT_MAX = 3;
const PARAGRAPH_SENTENCES_MIN = 2;
const PARAGRAPH_SENTENCES_MAX = 5;

const MAX_YEAR = 2019;
const MIN_YEAR = 1999;
const MOCK_MOVIES_COUNT = 8;

const headerMovieTitle = `The Grand Budapest Hotel`;

const getRatingLevel = (rate) => {
  if (rate < 3) {
    return `Bad`;
  } else if (rate < 5) {
    return `Normal`;
  } else if (rate < 8) {
    return `Good`;
  } else if (rate < 10) {
    return `Very Good`;
  }
  return `Awesome`;
};

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

const getRandomInteger = (min, max) => Math.round(Math.random() * (max - min) + min);

const getRandomItem = (items) => items[getRandomInteger(0, items.length - 1)];

const getRandomSubList = (items, value) => {
  let subList = [];
  if (value) {
    subList = items.slice();
    for (let i = 0; i < items.length - value; i++) {
      subList.splice(getRandomInteger(0, subList.length - 1), 1);
    }
  }
  return subList;
};

const getActorsText = () => {
  const actors = getRandomSubList(ACTORS, ACTORS_COUNT);
  return `${actors.join(`, `)} and other`;
};

const sentences = DESCRIPTION_TEXT.split(`. `).map((item) => item.endsWith(`.`) ? item : `${item}.`);

const getFilmDescription = () => {
  const paragraphsCount = getRandomInteger(PARAGRAPH_COUNT_MIN, PARAGRAPH_COUNT_MAX);
  const descriptions = new Array(paragraphsCount)
    .fill(``)
    .map(() => {
      const descriptionLength = getRandomInteger(PARAGRAPH_SENTENCES_MIN, PARAGRAPH_SENTENCES_MAX);
      return getRandomSubList(sentences, descriptionLength).join(` `);
    });
  return descriptions;
};

const allmovies = movieTitles.map((title, i) => {
  const src = getImgSrc(title);
  const rating = (Math.random() * 10).toFixed(1);
  const ratingLevel = getRatingLevel(rating);
  return {
    actors: getActorsText(),
    bigPoster: src,
    descriptions: getFilmDescription(),
    director: getRandomItem(DIRECTORS),
    genre: getRandomItem(GENRES),
    id: i,
    poster: src,
    ratingCount: getRandomInteger(50, 300),
    ratingLevel,
    ratingScore: rating,
    releaseYear: getRandomInteger(MIN_YEAR, MAX_YEAR),
    title,
  };
});

const headerMovie = {
  actors: getActorsText(),
  bigPoster: getBgSrc(headerMovieTitle),
  descriptions: getFilmDescription(),
  director: getRandomItem(DIRECTORS),
  genre: `Drama`,
  id: Math.round(Math.random() * new Date()),
  poster: getPosterSrc(headerMovieTitle),
  ratingCount: 240,
  ratingLevel: `Very good`,
  ratingScore: 8.9,
  releaseYear: 2014,
  title: headerMovieTitle,
};


allmovies.unshift(headerMovie);
const movies = allmovies.slice(0, MOCK_MOVIES_COUNT);
export {movies, getRatingLevel};
