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

const directors = [
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

const actors = [
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
const genres = [`Comedy`, `Crime`, `Documentary`, `Drama`, `Horror`, `Kids&Family`, `Romance`, `Sci-Fi`, `Thriller`];

const ACTORS_COUNT = 4;
const PARAGRAPH_COUNT_MIN = 1;
const PARAGRAPH_COUNT_MAX = 3;
const PARAGRAPH_SENTENCES_MIN = 2;
const PARAGRAPH_SENTENCES_MAX = 5;

const MAX_YEAR = 2019;
const MIN_YEAR = 1999;
const MOCK_MOVIES_COUNT = 8;

const promoMovieScore = `9.8`;
const promoMovieTitle = `The Grand Budapest Hotel`;

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


const sentences = DESCRIPTION_TEXT.split(`. `).map((item) => item.endsWith(`.`) ? item : `${item}.`);

const getDescriptionParagraphs = () => {
  const paragraphsCount = getRandomInteger(PARAGRAPH_COUNT_MIN, PARAGRAPH_COUNT_MAX);
  const descriptionParagraphs = new Array(paragraphsCount)
    .fill(``)
    .map(() => {
      const descriptionLength = getRandomInteger(PARAGRAPH_SENTENCES_MIN, PARAGRAPH_SENTENCES_MAX);
      return getRandomSubList(sentences, descriptionLength).join(` `);
    });
  return descriptionParagraphs;
};

const movies = movieTitles.slice(0, MOCK_MOVIES_COUNT).map((title, i) => {
  const src = getImgSrc(title);
  const ratingScore = (Math.random() * 10).toFixed(1);
  return {
    actors: getRandomSubList(actors, ACTORS_COUNT),
    bigPoster: src,
    description: {
      paragraphs: getDescriptionParagraphs()
    },
    director: getRandomItem(directors),
    genre: getRandomItem(genres),
    id: i,
    poster: src,
    rating: {
      count: getRandomInteger(50, 300),
      score: ratingScore
    },
    releaseYear: getRandomInteger(MIN_YEAR, MAX_YEAR),
    title,
  };
});

const promoMovie = {
  actors: getRandomSubList(actors, ACTORS_COUNT),
  bigPoster: getBgSrc(promoMovieTitle),
  descriptions: {
    paragraphs: getDescriptionParagraphs()
  },
  director: getRandomItem(directors),
  genre: `Drama`,
  id: Math.round(Math.random() * new Date()),
  poster: getPosterSrc(promoMovieTitle),
  rating: {
    count: 240,
    score: promoMovieScore
  },
  releaseYear: 2014,
  title: promoMovieTitle,
};


export {movies, promoMovie};
