import React from "react";
import PropTypes from "prop-types";

import GenresList from "../genres-list/genres-list.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";
import withActiveMovie from "../../hocs/with-active-movie/with-active-movie.jsx";

import {movieShape} from "../shapes.js";
import {getMoviesByGenre} from "../utils.js";

const GenresListWrapped = withActiveItem(GenresList);
const MoviesListWrapped = withActiveMovie(MoviesList);

const Main = (props) => {
  const {
    activeGenre,
    promoMovie,
    movies,
    moviesCount,
    onGenreClick,
    onMovieCardClick,
    onPlayButtonClick,
    onShowMoreButtonClick,
  } = props;

  const {
    bgPoster: bgSrc,
    genre: promoMovieGenre,
    poster: posterSrc,
    releaseYear: promoMovieYear,
    title: promoMovieTitle
  } = promoMovie;

  const posterAlt = `${promoMovieTitle} poster`;
  const currentMovies = getMoviesByGenre(activeGenre, movies);
  const showedMovies = currentMovies.slice(0, moviesCount);
  const hasHiddenMovies = (currentMovies.length > moviesCount);

  return <React.Fragment>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={bgSrc} alt={promoMovieTitle} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <a className="logo__link">
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
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={posterSrc} alt={posterAlt} width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{promoMovieTitle}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{promoMovieGenre}</span>
              <span className="movie-card__year">{promoMovieYear}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button" onClick={onPlayButtonClick}>
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
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenresListWrapped
          activeItem={activeGenre}
          movies={movies}
          onActiveChange={onGenreClick}
        />

        <MoviesListWrapped
          movies={showedMovies}
          moviesCount={moviesCount}
          onMovieCardClick={onMovieCardClick}
        />

        {hasHiddenMovies && <ShowMoreButton onClick={onShowMoreButtonClick}/>}

      </section>
      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
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

Main.propTypes = {
  activeGenre: PropTypes.string.isRequired,
  promoMovie: PropTypes.shape(movieShape).isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape(movieShape)
  ).isRequired,
  moviesCount: PropTypes.number.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

export default Main;
