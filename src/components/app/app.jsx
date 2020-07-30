import React, {PureComponent} from "react";
import {Route, Router, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import AddReview from "../add-review/add-review.jsx";
import ErrorScreen from "../error-screen/error-screen.jsx";
import LoadingScreen from "../loading-screen/loading-screen.jsx";
import Main from "../main/main.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import Player from "../player/player.jsx";
import PrivateRoute from "../private-root/private-root.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import withFullVideo from "../../hocs/with-full-video/with-full-video.jsx";

import {ActionCreator as StateActionCreator} from "../../reducer/app-state/app-state.js";
import {AppRoute, Page} from "../../const.js";
import {getLoadingState, getLoadingError} from "../../reducer/data/selectors.js";
import {getPage} from "../../reducer/app-state/selectors.js";
import history from "../../history.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const PlayerWrapped = withFullVideo(Player);

class App extends PureComponent {
  render() {
    return (
      <Router
        history={history}
      >
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderApp()}
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <SignIn/>
          </Route>
          <PrivateRoute
            exact
            path={AppRoute.MY_LIST}
            render={() => {}}
          />
        </Switch>
      </Router>
    );
  }

  _renderApp() {
    const {authorizationStatus, hasLoadingError, isLoading, onExitButtonClick, page} = this.props;

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

    switch (page) {
      case Page.MAIN:
        return <Main/>;
      case Page.DETAILS:
        return <MovieDetails/>;
      case Page.PLAYER:
        return <PlayerWrapped
          onExitButtonClick={onExitButtonClick}
        />;
      case Page.SIGN_IN:
        return (authorizationStatus === AuthorizationStatus.AUTH) ? history.push(AppRoute.ROOT) : history.push(AppRoute.LOGIN);
      case Page.ADD_REVIEW:
        return <AddReview/>;
      default: return null;
    }
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  hasLoadingError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onExitButtonClick: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  hasLoadingError: getLoadingError(state),
  isLoading: getLoadingState(state),
  page: getPage(state),
});

const mapDispatchToProps = (dispatch) => ({
  onExitButtonClick() {
    dispatch(StateActionCreator.returnToPreviousPage());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
