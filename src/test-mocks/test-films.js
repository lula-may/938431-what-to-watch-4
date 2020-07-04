const movieTitles = [
  `Jurassic Park`,
  `Gone With The Wind`,
  `The Godfather`,
  `Casablanca`,
  `A Streetcar Named Desire`,
  `Some Likes It Hot`,
];

const actors = [
  [`Sam Neill`, `Jeff GoldBlum`, `Laura Dern`],
  [`Tom Cruise`, `Rayan Gosling`],
  [`Anne Hathaway`, `Nicole Kidman`, `Keanu Reeves`],
  [`Will Smith`, `Bruce Willis`, `Mila Yovovich`],
  [`Sandra Bullock`, `Daniel Craig`],
  [`Robert De Niro`, `Vin Diesel`, `Charlize Theron`]
];

const reviews = [
  {
    author: `Betty Boughter`,
    date: new Date(2019, 6, 15, 23, 50),
    id: `Betty `,
    rating: `6.6`,
    text: `Betty Boughter bought some butter.`
  },
  {
    author: `Jack Daniels`,
    date: new Date(2020, 5, 2, 23, 50),
    id: `jack`,
    rating: `7.7`,
    text: `Jack and Jill went up the hill.`
  },
  {
    author: `Robert Burns`,
    date: new Date(2020, 2, 2, 23, 50),
    id: `burns`,
    rating: `8.8`,
    text: `Should old acquaintance be forgot and never brought to mind.`
  }
];

const MAX_RATING = 9.7;
const RATING_COUNT = 150;
const MAX_RELEASE_YEAR = 2000;

const directors = [`Stiven Spielberg`, `Mr. Good`, `Mr. Bad`, `Mrs. Ugly`, `Ms. Red`, `Mr. Black`];

const genres = [`Sci-Fi`, `War`, `Detective`, `Fantasy`, `Sport`, `Adventure`];

const testMovies = movieTitles.map((title, i) => {
  const rating = (MAX_RATING - i).toFixed(1);
  return {
    actors: actors[i],
    bigPoster: `bip-poster-${i}.jpg`,
    src: `video-${i}.mp3`,
    description: {
      paragraphs: [`bla-bla-bla`, `olya-lya-lya`, `wow-wow`]
    },
    director: directors[i],
    genre: genres[i],
    id: i.toString(),
    poster: `poster-${i}.jpg`,
    rating: {
      count: RATING_COUNT,
      score: rating,
    },
    releaseYear: MAX_RELEASE_YEAR - i,
    reviews,
    runTime: 60 + i,
    title,
  };
});


export {testMovies};

