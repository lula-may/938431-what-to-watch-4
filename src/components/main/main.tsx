import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import GenresList from "../genres-list/genres-list";
import MoviesList from "../movies-list/movies-list";
import ShowMoreButton from "../show-more-button/show-more-button";
import withActiveItem from "../../hocs/with-active-item/with-active-item";

import history from "../../history";
import {Movie} from "../../types";
import {ActionCreator as StateActionCreator} from "../../reducer/app-state/app-state";
import {Operation as DataOperation} from "../../reducer/data/data";
import {AuthorizationStatus} from "../../reducer/user/user";
import {getGenre} from "../../reducer/app-state/selectors";
import {getPromoMovie, getUploadingError, getUploadingState, selectMoviesGenres, selectMoviesByGenre} from "../../reducer/data/selectors";
import {getMoviesCount} from "../../reducer/app-state/selectors";
import {getAuthorizationStatus, getAvatarUrl} from "../../reducer/user/selectors";
import {AppRoute} from "../../const";

interface Props {
  activeGenre: string;
  authorizationStatus: string;
  avatar: string;
  genres: string[];
  hasUploadingError: boolean;
  isUploading: boolean;
  movies: Array<Movie>;
  moviesCount: number;
  onGenreClick: (genre: string) => void;
  onMovieCardClick: (movie: Movie) => void;
  onMyListButtonClick: (movie: Movie) => void;
  onShowMoreButtonClick: () => void;
  promoMovie: Movie;
}

const GenresListWrapped = withActiveItem(GenresList);

class Main extends React.PureComponent<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.handleAddToMyListButtonClick = this.handleAddToMyListButtonClick.bind(this);
  }

  handleAddToMyListButtonClick() {
    const {authorizationStatus, promoMovie, onMyListButtonClick} = this.props;
    return authorizationStatus === AuthorizationStatus.NO_AUTH
      ? history.push(AppRoute.LOGIN)
      : onMyListButtonClick(promoMovie);
  }

  render() {
    const {
      activeGenre,
      authorizationStatus,
      avatar,
      genres,
      hasUploadingError,
      isUploading,
      movies,
      moviesCount,
      onGenreClick,
      onMovieCardClick,
      onShowMoreButtonClick,
      promoMovie,
    } = this.props;

    const {
      bgPoster: bgSrc,
      genre: promoMovieGenre,
      poster: posterSrc,
      releaseYear: promoMovieYear,
      title: promoMovieTitle
    } = promoMovie;

    const hasHiddenMovies = movies.length > moviesCount;
    const {isFavorite} = promoMovie;
    const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
    const posterAlt = `${promoMovieTitle} poster`;
    const showedMovies = movies.slice(0, moviesCount);

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
            <Link to={AppRoute.MY_LIST} className="user-block__link">
              {isAuthorized
                ? <div className="user-block__avatar">
                  <img src={avatar} alt="User avatar" width="63" height="63" />
                </div>
                : <span>Sign in</span>
              }
            </Link>
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
                <Link to={`${AppRoute.FILMS}/${promoMovie.id}${AppRoute.PLAYER}`} className="btn btn--play movie-card__button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <button
                  className="btn btn--list movie-card__button"
                  type="button"
                  onClick={this.handleAddToMyListButtonClick}
                  disabled={isUploading}
                  style={hasUploadingError ? {border: `1px solid red`} : {}}
                >
                  {isFavorite
                    ? <svg viewBox="0 0 18 14" width="18" height="14">
                      <use xlinkHref="#in-list"></use>
                    </svg>
                    : <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                  }
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
            genres={genres}
            onActiveChange={onGenreClick}
          />

          <MoviesList
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
  }
}

const mapStateToProps = (state) => ({
  activeGenre: getGenre(state),
  authorizationStatus: getAuthorizationStatus(state),
  avatar: getAvatarUrl(state),
  genres: selectMoviesGenres(state),
  hasUploadingError: getUploadingError(state),
  isUploading: getUploadingState(state),
  movies: selectMoviesByGenre(state),
  moviesCount: getMoviesCount(state),
  promoMovie: getPromoMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(StateActionCreator.setGenre(genre));
    dispatch(StateActionCreator.resetCount());
  },

  onMovieCardClick(movie) {
    dispatch(StateActionCreator.setActiveMovie(movie));
    dispatch(DataOperation.loadComments(movie.id));
  },

  onShowMoreButtonClick() {
    dispatch(StateActionCreator.incrementMoviesCount());
  },

  onMyListButtonClick(movie) {
    dispatch(DataOperation.updateFavoriteMovies(movie));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
