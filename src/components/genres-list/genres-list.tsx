import * as React from "react";
import PropTypes from "prop-types";

const GenresList = (props) => {
  const {activeItem: activeGenre, genres, onClick} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => {
        const isActive = (activeGenre === genre);
        return (
          <li key={genre} className={`catalog__genres-item${isActive ? ` catalog__genres-item--active` : ``}`}>
            <a id={genre} href="#" className="catalog__genres-link" onClick={onClick}>{genre}</a>
          </li>
        );
      })}
    </ul>
  );
};

GenresList.propTypes = {
  activeItem: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GenresList;
