const HOUR = 60;
const DATE_STRING_LENGTH = 10;

const extend = (a, b) => Object.assign({}, a, b);

const formatTime = (duration) => {
  const hours = Math.floor(duration / HOUR);
  const minutes = duration % HOUR;

  return (
    (hours > 0)
      ? `${hours}h ${minutes}m`
      : `${minutes}m`
  );
};

const formatDate = (date) => date.toLocaleString(`en-US`, {day: `numeric`, month: `long`, year: `numeric`});

const formatDateTimeAttribute = (date) => date.toISOString().slice(0, DATE_STRING_LENGTH);

const getUniqueItems = (elements) => elements.filter((item, i, items) => items.indexOf(item) === i);

const getMovieGenres = (movies) => {
  const allMoviesGenres = movies.map((movie) => movie.genre);
  return getUniqueItems(allMoviesGenres);
};

export {extend, formatDate, formatTime, formatDateTimeAttribute, getMovieGenres};
