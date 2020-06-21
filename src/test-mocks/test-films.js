const movieTitles = [
  `Jurassic Park`,
  `Gone With The Wind`,
  `The Godfather`,
  `Casablanca`,
  `A Streetcar Named Desire`,
  `Some Likes It Hot`,
];

const ACTORS = [
  `Sam Neill, Jeff GoldBlum, Laura Dern and others`,
  `Tom Cruise, Rayan Gosling and others`,
  `Anne Hathaway, Nicole Kidman, Keanu Reeves and others`,
  `Will Smith, Bruce Willis, Mila Yovovich and others`,
  `Sandra Bullock, Daniel Craig and others`,
  `Robert De Niro, Vin Diesel, Charlize Theron and others`
];

const RateToText = {
  "9": `Excellent`,
  "8": `Very good`,
  "7": `Good`,
  "6": `Not bad`,
  "5": `Satisfactory`,
  "4": `Bad`,
  "3": `Very bad`,
  "2": `Terrible`,
  "1": `Terrible`
};


const DIRECTORS = [`Stiven Spielberg`, `Mr. Good`, `Mr. Bad`, `Mrs. Ugly`, `Ms. Red`, `Mr. Black`];

const GENRES = [`Sci-Fi`, `War`, `Detective`, `Fantasy`, `Sport`, `Adventure`];

const testMovies = movieTitles.map((title, i) => {
  const rating = Math.round((9.7 - i) * 10) / 10;
  const ratingLevel = RateToText[Math.floor(rating).toString()];
  return {
    actors: ACTORS[i],
    bigPoster: `bip-poster-${i}.jpg`,
    descriptions: [`bla-bla-bla`, `olya-lya-lya`, `wow-wow`],
    director: DIRECTORS[i],
    genre: GENRES[i],
    id: i,
    poster: `poster-${i}.jpg`,
    ratingCount: 150,
    ratingLevel,
    ratingScore: rating,
    releaseYear: 2000 - i,
    title,
  };
});


export {testMovies};

