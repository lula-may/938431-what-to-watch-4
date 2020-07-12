import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import Player from "../player/player.jsx";
import withFullVideo from "../../hocs/with-full-video/with-full-video.jsx";
import {movieShape} from "../shapes.js";
import {ActionCreator} from "../../reducer.js";

const Page = {
  MAIN: `main`,
  DETAILS: `details`,
  PLAYER: `player`,
};

const PlayerWrapped = withFullVideo(Player);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: Page.MAIN,
      movie: this.props.headerMovie
    };

    this._handleCardClick = this._handleCardClick.bind(this);
  }

  render() {
    const {movie} = this.state;
    const {movies} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MovieDetails
              movie={movie}
              allMovies={movies}
              onMovieCardClick={this._handleCardClick}
            />
          </Route>
          <Route exact path="/dev-player">
            <PlayerWrapped
              movie={movie}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderApp() {
    const {
      activeGenre,
      headerMovie,
      movies,
      moviesCount,
      onGenreClick,
      onShowMoreButtonClick,
    } = this.props;

    const {movie, page} = this.state;

    switch (page) {
      case Page.MAIN:
        return <Main
          activeGenre={activeGenre}
          headerMovie={headerMovie}
          movies={movies}
          moviesCount={moviesCount}
          onGenreClick={onGenreClick}
          onMovieCardClick={this._handleCardClick}
          onShowMoreButtonClick={onShowMoreButtonClick}
        />;
      case Page.DETAILS:
        return <MovieDetails
          movie={movie}
          allMovies={movies}
          onMovieCardClick={this._handleCardClick}
        />;
      case Page.PLAYER:
        return <PlayerWrapped
          movie={movie}
        />;
      default: return null;
    }
  }

  _handleCardClick(movie) {
    this.setState({
      page: Page.DETAILS,
      movie
    });
  }
}

App.propTypes = {
  activeGenre: PropTypes.string.isRequired,
  headerMovie: PropTypes.shape(movieShape).isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape(movieShape)
  ).isRequired,
  moviesCount: PropTypes.number.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeGenre: state.genre,
  movies: state.movies,
  moviesCount: state.moviesCount,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.setGenre(genre));
    dispatch(ActionCreator.resetCount());
  },

  onShowMoreButtonClick() {
    dispatch(ActionCreator.incrementMoviesCount());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
