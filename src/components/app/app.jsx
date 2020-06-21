import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import {movieShape} from "../shapes.js";
import MovieDetails from "../movie-details/movie-details.jsx";

const Mode = {
  MAIN: `main`,
  DETAILS: `details`,
};

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mode: Mode.MAIN,
      movie: this.props.movies[0]
    };
    this._handleCardClick = this._handleCardClick.bind(this);
  }

  render() {
    const movie = this.state.movie;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MovieDetails
              movie={movie} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderApp() {
    const {headerMovie, movies} = this.props;
    const mode = this.state.mode;
    switch (mode) {
      case Mode.MAIN:
        return <Main
          headerMovie={headerMovie}
          movies={movies}
          onMovieTitleClick={this._handleCardClick}
        />;
      case Mode.DETAILS:
        return <MovieDetails
          movie={this.state.movie}
        />;
      default: return null;
    }
  }

  _handleCardClick(movie) {
    this.setState({
      mode: Mode.DETAILS,
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
