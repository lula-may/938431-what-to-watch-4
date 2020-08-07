import * as React from "react";
import {Link} from "react-router-dom";

import {AppRoute, TEXT_COLOR} from "../../const";

const NotFoundPage: React.FC = () => {
  return (
    <div className="user-page" style={{textAlign: `center`}}>
      <h1>404</h1>
      <h2>Page not found</h2>
      <Link to={AppRoute.ROOT} style={{color: TEXT_COLOR}}>Go to main page</Link>
    </div>
  );
};

export default NotFoundPage;
