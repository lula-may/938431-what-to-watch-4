import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import {movieShape} from "../shapes.js";
import {SHOWED_MOVIES_ON_START_COUNT} from "../../const";

const Page = {
  MAIN: `main`,
  DETAILS: `details`,
};

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: Page.MAIN,
      movie: this.props.headerMovie
    };

    this.showedMovies = props.movies.slice(0, SHOWED_MOVIES_ON_START_COUNT);
    this._handleCardClick = this._handleCardClick.bind(this);
  }

  render() {
    const {movie} = this.state;
    const showedMovies = this.showedMovies;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MovieDetails
              movie={movie}
              allMovies={showedMovies}
              onMovieCardClick={this._handleCardClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderApp() {
    const {headerMovie, movies} = this.props;
    const {movie, page} = this.state;
    const showedMovies = this.showedMovies;
    switch (page) {
      case Page.MAIN:
        return <Main
          headerMovie={headerMovie}
          movies={showedMovies}
          onMovieCardClick={this._handleCardClick}
        />;
      case Page.DETAILS:
        return <MovieDetails
          movie={movie}
          allMovies={movies}
          onMovieCardClick={this._handleCardClick}
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
  headerMovie: PropTypes.shape(movieShape).isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape(movieShape)
  ).isRequired
};

export default App;
