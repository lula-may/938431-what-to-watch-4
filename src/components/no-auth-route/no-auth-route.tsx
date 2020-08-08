import * as React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {connect} from "react-redux";

import {AppRoute} from "../../const";
import {AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";

type Props = RouteProps & {
  authorizationStatus: string;
  render: () => React.ReactNode;
};


const NoAuthRoute: React.FC<Props> = (props: Props) => {
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

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {NoAuthRoute};

export default connect(mapStateToProps)(NoAuthRoute);
