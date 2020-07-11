import React from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import Tabs from "../tabs/tabs.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";
import {movieShape} from "../shapes";
import {SIMILAR_MOVIES_COUNT, TabType} from "../../const";

const TabsWrapped = withActiveItem(Tabs);

const MovieDetails = (props) => {
  const {allMovies, movie, onMovieCardClick} = props;
  const {
    bigPoster,
    genre,
    poster,
    releaseYear,
    title,
  } = movie;
  const similarMovies = allMovies.filter((item) => (item.genre === movie.genre && item.id !== movie.id));

  return <React.Fragment>
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={bigPoster} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{releaseYear}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
              <a href="add-review.html" className="btn movie-card__button">Add review</a>
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={poster} alt={`${title} poster`} width="218" height="327" />
          </div>
          <TabsWrapped
            movie={movie}
            activeItem={TabType.OVERVIEW}
            onActiveChange={() => {}}
          />
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <MoviesList
          movies={similarMovies}
          moviesCount={SIMILAR_MOVIES_COUNT}
          onMovieCardClick={onMovieCardClick}
        />
      </section>
      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>;
};

MovieDetails.propTypes = {
  movie: PropTypes.shape(movieShape).isRequired,
  allMovies: PropTypes.arrayOf(
      PropTypes.shape(movieShape)
  ).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
};

export default MovieDetails;
