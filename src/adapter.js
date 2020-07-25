export const adaptMovie = (movie) => {
  const {
    description,
    director,
    genre,
    id,
    name,
    released,
    starring,
  } = movie;

  return {
    actors: starring,
    bgColor: movie[`background_color`],
    bgPoster: movie[`background_image`],
    description,
    director,
    genre,
    id,
    isFavorite: movie[`is_favorite`],
    poster: movie[`poster_image`],
    previewPoster: movie[`preview_image`],
    rating: {
      count: movie[`scores_count`],
      score: movie[`rating`],
    },
    releaseYear: released,
    reviews: [],
    runTime: movie[`run_time`],
    src: movie[`video_link`],
    title: name,
  };
};

const adaptComment = (review) => {
  const {id, user, rating, comment, date} = review;
  return {
    id,
    author: user.name,
    authorId: user.id,
    date: new Date(date),
    rating,
    text: comment,
  };
};

export const adaptComments = (comments) => comments.map((comment) => adaptComment(comment));

export const adaptMovies = (movies) => movies.map((movie) => adaptMovie(movie));
