import * as React from "react";

import Details from "../details/details";
import Overview from "../overview/overview";
import Reviews from "../reviews/reviews";
import {Movie, Review, TabType} from "../../types";

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


interface Props {
  activeItem: string;
  comments: Array<Review>;
  hasLoadingError: boolean;
  movie: Movie;
  onClick: () => void;
}

const Tabs: React.FC<Props> = (props: Props) => {
  const {activeItem, hasLoadingError, movie, comments, onClick} = props;

  const renderInfo = () => {
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
  };

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
      {renderInfo()}
    </div>
  );
};

export default Tabs;
