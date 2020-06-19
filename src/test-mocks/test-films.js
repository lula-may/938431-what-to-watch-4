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
    id: i,
    src: `poster-${i}.jpg`
  };
});

const headerMovie = {
  title: `Jurassic Park`,
  genre: `Sci-Fi`,
  releaseYear: 1993,
  bg: `background.jpg`,
  poster: `header-poster.jpg`
};

export {movies, headerMovie};

