import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Error from "../error/error.jsx";
import Main from "../main/main.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import Player from "../player/player.jsx";
import withFullVideo from "../../hocs/with-full-video/with-full-video.jsx";
import {movieShape} from "../shapes.js";
import {ActionCreator as StateActionCreator} from "../../reducer/app-state/app-state.js";
import {ActionCreator as DataActionCreator} from "../../reducer/data/data.js";
import {getActiveMovie, getGenre, getMovies, getPromoMovie, getLoadingState, getErrorState} from "../../reducer/data/selectors.js";
import {getPage, getMoviesCount} from "../../reducer/app-state/selectors.js";
import {Page} from "../../const.js";

const PlayerWrapped = withFullVideo(Player);

class App extends PureComponent {

  render() {
    const {activeMovie, movies, onCardClick, onPlayButtonClick} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MovieDetails
              movie={activeMovie}
              allMovies={movies}
              onMovieCardClick={onCardClick}
              onPlayButtonClick={onPlayButtonClick}
            />
          </Route>
          <Route exact path="/dev-player">
            <PlayerWrapped
              movie={activeMovie}
              onExitButtonClick={this._handleExitPlayerButtonClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderApp() {
    const {
      activeMovie,
      activeGenre,
      hasErrors,
      isLoading,
      movies,
      moviesCount,
      onCardClick,
      onExitButtonClick,
      onGenreClick,
      onPlayButtonClick,
      onShowMoreButtonClick,
      page,
      promoMovie,
    } = this.props;

    if (isLoading) {
      return <div style={{textAlign: `center`, marginTop: `300px`}}>Loading...</div>;
    }
    if (hasErrors) {
      return (
        <Error/>
      );
    }

    if (activeMovie && promoMovie && movies) {
      switch (page) {
        case Page.MAIN:
          return <Main
            activeGenre={activeGenre}
            promoMovie={promoMovie}
            movies={movies}
            moviesCount={moviesCount}
            onGenreClick={onGenreClick}
            onMovieCardClick={onCardClick}
            onPlayButtonClick={onPlayButtonClick}
            onShowMoreButtonClick={onShowMoreButtonClick}
          />;
        case Page.DETAILS:
          return <MovieDetails
            movie={activeMovie}
            allMovies={movies}
            onMovieCardClick={onCardClick}
            onPlayButtonClick={onPlayButtonClick}
          />;
        case Page.PLAYER:
          return <PlayerWrapped
            movie={activeMovie}
            onExitButtonClick={onExitButtonClick}
          />;
        default: return null;
      }
    }
    return null;
  }
}

App.propTypes = {
  activeGenre: PropTypes.string.isRequired,
  activeMovie: PropTypes.shape(movieShape).isRequired,
  hasErrors: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape(movieShape)
  ).isRequired,
  moviesCount: PropTypes.number.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onExitButtonClick: PropTypes.func.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  promoMovie: PropTypes.shape(movieShape).isRequired,
};

const mapStateToProps = (state) => ({
  activeGenre: getGenre(state),
  activeMovie: getActiveMovie(state),
  hasErrors: getErrorState(state),
  isLoading: getLoadingState(state),
  movies: getMovies(state),
  moviesCount: getMoviesCount(state),
  page: getPage(state),
  promoMovie: getPromoMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCardClick(movie) {
    dispatch(DataActionCreator.setActiveMovie(movie));
    dispatch(StateActionCreator.setPage(Page.DETAILS));
  },

  onExitButtonClick() {
    dispatch(StateActionCreator.returnToPreviousPage());
  },

  onGenreClick(genre) {
    dispatch(DataActionCreator.setGenre(genre));
    dispatch(StateActionCreator.resetCount());
  },

  onPlayButtonClick() {
    dispatch(StateActionCreator.saveCurrentPage());
    dispatch(StateActionCreator.setPage(Page.PLAYER));
  },

  onShowMoreButtonClick() {
    dispatch(StateActionCreator.incrementMoviesCount());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
