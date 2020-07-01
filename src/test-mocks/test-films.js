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
    id: i,
    poster: `poster-${i}.jpg`,
    rating: {
      count: RATING_COUNT,
      score: rating,
    },
    releaseYear: MAX_RELEASE_YEAR - i,
    title,
  };
});


export {testMovies};

