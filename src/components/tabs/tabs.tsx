import * as React from "react";
import PropTypes from "prop-types";

import Details from "../details/details.jsx";
import Overview from "../overview/overview.jsx";
import Reviews from "../reviews/reviews.jsx";
import {movieShape, reviewShape} from "../shapes";
import {TabType} from "../../const";

const tabsWithIds = [
  {
    type: TabType.OVERVIEW,
    id: `0`
  },
  {
    type: TabType.DETAILS,
    id: `1`
  },
  {
    type: TabType.REVIEWS,
    id: `2`
  }
];

class Tabs extends React.PureComponent {

  renderInfo() {
    const {activeItem, hasLoadingError, movie, comments} = this.props;
    switch (activeItem) {
      case TabType.OVERVIEW:
        return (
          <Overview movie={movie}/>
        );
      case TabType.DETAILS:
        return (
          <Details movie={movie}/>
        );
      case TabType.REVIEWS:
        return (
          <Reviews
            comments={comments}
            hasLoadingError={hasLoadingError}
          />
        );
      default: return null;
    }
  }

  render() {
    const {activeItem, onClick} = this.props;
    return (
      <div className="movie-card__desc">

        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {tabsWithIds.map((item) => {
              const isActive = item.type === activeItem;
              return (
                <li key={item.id} className={`movie-nav__item${isActive ? ` movie-nav__item--active` : ``}`}>
                  <a href="#"
                    className="movie-nav__link"
                    id={item.type}
                    onClick={onClick}
                  >{item.type}</a>
                </li>
              );
            })}
          </ul>
        </nav>
        {this.renderInfo()}
      </div>
    );
  }
}

Tabs.propTypes = {
  activeItem: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(reviewShape)),
  hasLoadingError: PropTypes.bool.isRequired,
  movie: PropTypes.shape(movieShape).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tabs;
