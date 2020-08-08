import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import MoviesList from "../movies-list/movies-list";

import {ActionCreator as StateActionCreator} from "../../reducer/app-state/app-state";
import {AppRoute} from "../../const";
import {getAvatarUrl} from "../../reducer/user/selectors";
import {getFavoriteMovies, getFavoriteLoadingError, getFavoriteLoadingState} from "../../reducer/data/selectors";
import {Movie} from "../../types";
import {Operation as DataOperation} from "../../reducer/data/data";

interface Props {
  avatarUrl: string;
  favoriteMovies: Array<Movie>;
  hasFavoriteLoadingError: boolean;
  isLoading: boolean;
  loadFavoriteMovies: () => void;
  onMovieCardClick: (movie: Movie) => void;
}

class MyList extends React.PureComponent<Props> {
  props: Props;

  componentDidMount() {
    const {loadFavoriteMovies} = this.props;
    loadFavoriteMovies();
  }

  render() {
    const {avatarUrl, favoriteMovies, hasFavoriteLoadingError, isLoading, onMovieCardClick} = this.props;

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
          {isLoading && <p style={{textAlign: `center`}}>Loading...</p>}
          {hasFavoriteLoadingError &&
            <p style={{textAlign: `center`}}>Sorry, we failed to load your favortite movies. Please, try again later.</p>
          }
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
  }
}

const mapStateToProps = (state) => ({
  avatarUrl: getAvatarUrl(state),
  favoriteMovies: getFavoriteMovies(state),
  hasFavoriteLoadingError: getFavoriteLoadingError(state),
  isLoading: getFavoriteLoadingState(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteMovies() {
    dispatch(DataOperation.loadFavoriteMovies());
  },
  onMovieCardClick(movie) {
    dispatch(StateActionCreator.setActiveMovie(movie));
    dispatch(DataOperation.loadComments(movie.id));
  }
});

export {MyList};

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
