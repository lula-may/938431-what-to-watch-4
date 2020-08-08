import * as React from "react";
import {Route, Router, Switch} from "react-router-dom";
import {connect} from "react-redux";

import AddReview from "../add-review/add-review";
import ErrorScreen from "../error-screen/error-screen";
import LoadingScreen from "../loading-screen/loading-screen";
import Main from "../main/main";
import MovieDetails from "../movie-details/movie-details";
import MyList from "../my-list/my-list";
import NoAuthRoute from "../no-auth-route/no-auth-route";
import NotFoundPage from "../not-found-page/not-found-page";
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

const App: React.FC<Props> = (props: Props) => {
  const {hasLoadingError, isLoading} = props;

  const renderComponent = (Component) => {
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
  };

  return (
    <Router
      history={history}
    >
      <Switch>
        <Route exact path={AppRoute.ROOT}
          render={(serviceProps) => renderComponent(<Main {...serviceProps}/>)}
        />

        <NoAuthRoute exact path={AppRoute.LOGIN}
          render={() => (<SignIn/>)}
        />

        <Route exact path={`${AppRoute.FILMS}/:id`}
          render={(serviceProps) => renderComponent(<MovieDetails {...serviceProps}/>)}
        />

        <Route
          exact
          path={`${AppRoute.FILMS}/:id${AppRoute.PLAYER}`}
          render={(serviceProps) => renderComponent(<PlayerWrapped {...serviceProps}/>)}
        />

        <PrivateRoute
          exact
          path={`${AppRoute.FILMS}/:id${AppRoute.REVIEW}`}
          render={(serviceProps) => (<AddReview {...serviceProps}/>)}
        />

        <PrivateRoute
          exact
          path={AppRoute.MY_LIST}
          render={() => (<MyList/>)}
        />

        <Route>
          <NotFoundPage/>
        </Route>
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  hasLoadingError: getLoadingError(state),
  isLoading: getLoadingState(state),
});

export {App};
export default connect(mapStateToProps)(App);
