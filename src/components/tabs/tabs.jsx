import React from "react";
import PropTypes from "prop-types";
import Details from "../details/details.jsx";
import Overview from "../overview/overview.jsx";
import Reviews from "../reviews/reviews.jsx";
import {TabType} from "../../const";
import {movieShape} from "../shapes";

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


const Tabs = (props) => {
  const {activeTab, movie, onClick} = props;

  const renderInfo = () => {
    switch (activeTab) {
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
          <Reviews movie={movie}/>
        );
      default: return null;
    }
  };

  return (
    <div className="movie-card__desc">

      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {tabsWithIds.map((item) => {
            const isActive = item.type === activeTab;
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
      {renderInfo()}
    </div>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  movie: PropTypes.shape(movieShape).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tabs;
