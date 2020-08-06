import * as React from "react";

interface Props {
  activeItem: string;
  genres: string[];
  onClick: () => void;
}

const GenresList: React.FC<Props> = (props: Props) => {
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

export default GenresList;
