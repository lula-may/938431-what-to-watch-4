import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import {movieShape} from "../shapes.js";

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

    this._handleCardClick = this._handleCardClick.bind(this);
  }

  render() {
    const {movie} = this.state;
    const {showedMovies} = this.props;

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
    const {headerMovie, showedMovies, movies} = this.props;
    const {movie, page} = this.state;

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
  showedMovies: PropTypes.arrayOf(
      PropTypes.shape(movieShape)
  ).isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape(movieShape)
  ).isRequired
};

const mapStateToProps = (state) => ({
  movies: state.allMovies,
  showedMovies: state.showedMovies,
});

export {App};
export default connect(mapStateToProps)(App);
