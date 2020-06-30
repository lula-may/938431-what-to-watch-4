import React from "react";
import PropTypes from "prop-types";

const Tabs = (props) => {
  const {activeTab, onClick, tabs} = props;

  const getClickHandler = (type) => {
    return (evt) => {
      evt.preventDefault();
      onClick(type);
    };
  };

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {tabs.map((item) => {
          const isActive = item.type === activeTab;
          return (
            <li key={item.id} id={item.type} className={`movie-nav__item${isActive ? ` movie-nav__item--active` : ``}`}>
              <a href="#"
                className="movie-nav__link"
                onClick={getClickHandler(item.type)}
              >{item.type}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );

};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })),
};

export default Tabs;
