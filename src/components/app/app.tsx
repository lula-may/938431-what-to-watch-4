import * as React from "react";
import {Link, Route, Router, Switch} from "react-router-dom";
import {connect} from "react-redux";

import AddReview from "../add-review/add-review";
import ErrorScreen from "../error-screen/error-screen";
import LoadingScreen from "../loading-screen/loading-screen";
import Main from "../main/main";
import MovieDetails from "../movie-details/movie-details";
import MyList from "../my-list/my-list";
import NoAuthRoute from "../no-auth-route/no-auth-route";
import Player from "../player/player";
import PrivateRoute from "../private-root/private-root";
import SignIn from "../sign-in/sign-in";
import withFullVideo from "../../hocs/with-full-video/with-full-video";

import {AppRoute} from "../../const";
import {getLoadingState, getLoadingError} from "../../reducer/data/selectors";
import history from "../../history";

interface Props {
  hasLoadingError: boolean;
  isLoading: boolean;
}

const PlayerWrapped = withFullVideo(Player);

class App extends React.PureComponent<Props> {
  props: Props;

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

const mapStateToProps = (state) => ({
  hasLoadingError: getLoadingError(state),
  isLoading: getLoadingState(state),
});

export {App};
export default connect(mapStateToProps)(App);
