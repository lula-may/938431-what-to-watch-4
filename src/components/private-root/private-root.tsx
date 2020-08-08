import * as React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {connect} from "react-redux";

import ErrorScreen from "../error-screen/error-screen";
import LoadingScreen from "../loading-screen/loading-screen";

import {AppRoute} from "../../const";
import {AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {getLoadingState, getLoadingError} from "../../reducer/data/selectors";

type Props = RouteProps & {
  authorizationStatus: string;
  hasLoadingError: boolean;
  isLoading: boolean;
  render: (props: RouteProps) => React.ReactNode;
};


const PrivateRoute: React.FC<Props> = (props: Props) => {
  const {authorizationStatus, hasLoadingError, isLoading, path, render} = props;
  return (
    <Route
      exact
      path={path}
      render={(serviceProps) => {
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
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render(serviceProps)
            : <Redirect to={AppRoute.LOGIN}/>
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  hasLoadingError: getLoadingError(state),
  isLoading: getLoadingState(state),
});

export {PrivateRoute};

export default connect(mapStateToProps)(PrivateRoute);
