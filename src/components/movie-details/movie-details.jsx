import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import MoviesList from "../movies-list/movies-list.jsx";
import Tabs from "../tabs/tabs.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";
import withActiveMovie from "../../hocs/with-active-movie/with-active-movie.jsx";

import {movieShape, reviewShape} from "../shapes";
import {Page, SIMILAR_MOVIES_COUNT, TabType} from "../../const";
import {ActionCreator as StateActionCreator} from "../../reducer/app-state/app-state.js";
import {ActionCreator as DataActionCreator, Operation as DataOperation} from "../../reducer/data/data.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getActiveMovie, getMovieComments, selectSimilarMovies, getLoadingError} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus, getAvatarUrl} from "../../reducer/user/selectors.js";

const MoviesListWrapped = withActiveMovie(MoviesList);
const TabsWrapped = withActiveItem(Tabs);

const MovieDetails = (props) => {
  const {
    authorizationStatus,
    avatar,
    comments,
    hasLoadingError,
    movie,
    onAddReviewButtonClick,
    onMovieCardClick,
    onPlayButtonClick,
    similarMovies,
  } = props;
  const {
    bgColor,
    bgPoster,
    genre,
    poster,
    releaseYear,
    title,
  } = movie;

  const isUserAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

  return <React.Fragment>
    <section className="movie-card movie-card--full" style={{backgroundColor: bgColor}}>
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={bgPoster} alt={title} />
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

          {isUserAuthorized && <div className="user-block">
            <div className="user-block__avatar">
              <img src={avatar} alt="User avatar" width="63" height="63" />
            </div>
          </div>}
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{releaseYear}</span>
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
              {isUserAuthorized && <a href="add-review.html" className="btn movie-card__button" onClick={onAddReviewButtonClick}>Add review</a>}
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
            activeItem={TabType.OVERVIEW}
            comments={comments}
            hasLoadingError={hasLoadingError}
            movie={movie}
            onActiveChange={() => {}}
          />
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <MoviesListWrapped
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
  authorizationStatus: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(reviewShape)),
  hasLoadingError: PropTypes.bool.isRequired,
  movie: PropTypes.shape(movieShape).isRequired,
  similarMovies: PropTypes.arrayOf(
      PropTypes.shape(movieShape)
  ).isRequired,
  onAddReviewButtonClick: PropTypes.func.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  avatar: getAvatarUrl(state),
  comments: getMovieComments(state),
  hasLoadingError: getLoadingError(state),
  movie: getActiveMovie(state),
  similarMovies: selectSimilarMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAddReviewButtonClick(evt) {
    evt.preventDefault();
    dispatch(StateActionCreator.setPage(Page.ADD_REVIEW));
  },

  onMovieCardClick(movie) {
    dispatch(DataActionCreator.setActiveMovie(movie));
    dispatch(DataOperation.loadComments(movie.id));
    dispatch(StateActionCreator.setPage(Page.DETAILS));
  },

  onPlayButtonClick() {
    dispatch(StateActionCreator.saveCurrentPage());
    dispatch(StateActionCreator.setPage(Page.PLAYER));
  },
});

export {MovieDetails};
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
