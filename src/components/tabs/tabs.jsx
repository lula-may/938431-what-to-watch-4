import React from "react";
import PropTypes from "prop-types";
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


const Tabs = (props) => {
  const {activeTab, children, onClick} = props;

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
      {children}
    </div>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tabs;
