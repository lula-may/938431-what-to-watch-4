import * as React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import ErrorScreen from "../error-screen/error-screen";
import LoadingScreen from "../loading-screen/loading-screen";

import {AppRoute} from "../../const";
import {AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {getLoadingState, getLoadingError} from "../../reducer/data/selectors";

const PrivateRoute = (props) => {
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

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  hasLoadingError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  hasLoadingError: getLoadingError(state),
  isLoading: getLoadingState(state),
});

export {PrivateRoute};

export default connect(mapStateToProps)(PrivateRoute);
