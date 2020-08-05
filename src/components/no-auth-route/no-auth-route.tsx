import * as React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {AppRoute} from "../../const";
import {AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";

const NoAuthRoute = (props) => {
  const {authorizationStatus, path, render} = props;
  return (
    <Route
      exact
      path={path}
      render={() => {
        return (
          authorizationStatus === AuthorizationStatus.NO_AUTH
            ? render()
            : <Redirect to={AppRoute.ROOT}/>
        );
      }}
    />
  );
};

NoAuthRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {NoAuthRoute};

export default connect(mapStateToProps)(NoAuthRoute);
