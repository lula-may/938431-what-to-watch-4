import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {AppRoute} from "../../const.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";

const PrivateRoute = (props) => {
  const {authorizationStatus, exact, path, render} = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render()
            : <Redirect to={AppRoute.LOGIN}/>
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {PrivateRoute};

export default connect(mapStateToProps)(PrivateRoute);
