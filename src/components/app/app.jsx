import React, {PureComponent} from "react";
import {Link, Route, Router, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import AddReview from "../add-review/add-review.jsx";
import ErrorScreen from "../error-screen/error-screen.jsx";
import LoadingScreen from "../loading-screen/loading-screen.jsx";
import Main from "../main/main.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import MyList from "../my-list/my-list.jsx";
import NoAuthRoute from "../no-auth-route/no-auth-route.jsx";
import Player from "../player/player.jsx";
import PrivateRoute from "../private-root/private-root.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import withFullVideo from "../../hocs/with-full-video/with-full-video.jsx";

import {AppRoute} from "../../const.js";
import {getLoadingState, getLoadingError} from "../../reducer/data/selectors.js";
import history from "../../history.js";

const PlayerWrapped = withFullVideo(Player);

class App extends PureComponent {

  renderComponent(Component) {
    const {hasLoadingError, isLoading} = this.props;

    if (isLoading) {
      return (
        <LoadingScreen/>
      );
    }
    if (hasLoadingError) {
      return (
        <ErrorScreen/>
      );
    }
    return Component;
  }

  render() {
    return (
      <Router
        history={history}
      >
        <Switch>
          <Route exact path={AppRoute.ROOT}
            render={(props) => this.renderComponent(<Main {...props}/>)}
          />

          <NoAuthRoute exact path={AppRoute.LOGIN}
            render={() => (<SignIn/>)}
          />

          <Route exact path={`${AppRoute.FILMS}/:id`}
            render={(props) => this.renderComponent(<MovieDetails {...props}/>)}
          />

          <Route
            exact
            path={`${AppRoute.FILMS}/:id${AppRoute.PLAYER}`}
            render={(props) => this.renderComponent(<PlayerWrapped {...props}/>)}
          />

          <PrivateRoute
            exact
            path={`${AppRoute.FILMS}/:id${AppRoute.REVIEW}`}
            render={(props) => (<AddReview {...props}/>)}
          />

          <PrivateRoute
            exact
            path={AppRoute.MY_LIST}
            render={() => (<MyList/>)}
          />

          <Route
            render={() => (
              <div className="user-page" style={{textAlign: `center`}}>
                <h1>
                404
                </h1>
                <h2>Page not found</h2>
                <Link to={AppRoute.ROOT} style={{color: `#c9b37e`}}>Go to main page</Link>
              </div>)}
          />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  hasLoadingError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  hasLoadingError: getLoadingError(state),
  isLoading: getLoadingState(state),
});

export {App};
export default connect(mapStateToProps)(App);
