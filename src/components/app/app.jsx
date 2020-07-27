import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import AddReview from "../add-review/add-review.jsx";
import ErrorScreen from "../error-screen/error-screen.jsx";
import LoadingScreen from "../loading-screen/loading-screen.jsx";
import Main from "../main/main.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import Player from "../player/player.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import withFullVideo from "../../hocs/with-full-video/with-full-video.jsx";

import {ActionCreator as StateActionCreator} from "../../reducer/app-state/app-state.js";
import {getLoadingState, getErrorState} from "../../reducer/data/selectors.js";
import {getPage} from "../../reducer/app-state/selectors.js";
import {Page} from "../../const.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const PlayerWrapped = withFullVideo(Player);

class App extends PureComponent {
  render() {
    const {onExitButtonClick} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MovieDetails/>
          </Route>
          <Route exact path="/dev-player">
            <PlayerWrapped
              onExitButtonClick={onExitButtonClick}
            />
          </Route>
          <Route exact path="/dev-sign-in">
            <SignIn/>
          </Route>
          <Route exact path="/dev-review">
            <AddReview/>
          </Route>

        </Switch>
      </BrowserRouter>
    );
  }

  _renderApp() {
    const {authorizationStatus, hasFilmsLoadingError, isLoading, onExitButtonClick, page} = this.props;

    if (isLoading) {
      return (
        <LoadingScreen/>
      );
    }
    if (hasFilmsLoadingError) {
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
        return (authorizationStatus === AuthorizationStatus.AUTH) ? <Main/> : <SignIn/>;
      case Page.ADD_REVIEW:
        return <AddReview/>;
      default: return null;
    }
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  hasFilmsLoadingError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onExitButtonClick: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  hasFilmsLoadingError: getErrorState(state),
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
