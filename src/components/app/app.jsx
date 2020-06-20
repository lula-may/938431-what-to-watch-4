import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import {headerMovieShape, movieShape} from "../shapes.js";
import MovieDetails from "../movie-details/movie-details.jsx";

const onMovieTitleClick = () => {};

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MovieDetails />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderApp() {
    const {headerMovie, movies} = this.props;

    return <Main
      headerMovie={headerMovie}
      movies={movies}
      onMovieTitleClick={onMovieTitleClick}
    />;
  }
}


App.propTypes = {
  headerMovie: PropTypes.shape(headerMovieShape).isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape(movieShape)
  ).isRequired
};

export default App;
