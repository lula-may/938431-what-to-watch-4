import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import MoviesList from "../movies-list/movies-list.jsx";

import {AppRoute} from "../../const.js";
import {ActionCreator, Operation} from "../../reducer/data/data.js";
import {getFavoriteMovies} from "../../reducer/data/selectors.js";
import {movieShape} from "../shapes.js";
import {getAvatarUrl} from "../../reducer/user/selectors.js";

const MyList = (props) => {
  const {avatarUrl, favoriteMovies, onMovieCardClick} = props;
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.ROOT} href="main.html" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src={avatarUrl} alt="User avatar" width="63" height="63" />
          </div>
        </div>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <MoviesList
          movies={favoriteMovies}
          moviesCount={favoriteMovies.length}
          onMovieCardClick={onMovieCardClick}
        />
      </section>

      <footer className="page-footer">
        <div className="logo">
          <Link to={AppRoute.ROOT} href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

MyList.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  favoriteMovies: PropTypes.arrayOf(PropTypes.shape(movieShape)).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  avatarUrl: getAvatarUrl(state),
  favoriteMovies: getFavoriteMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMovieCardClick(movie) {
    dispatch(ActionCreator.setActiveMovie(movie));
    dispatch(Operation.loadComments(movie));
  }
});

export {MyList};

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
