import * as React from "react";

interface Props {
  onClick: () => void;
}

const ShowMoreButton: React.FC<Props> = (props: Props) => {
  const {onClick} = props;
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onClick}>Show more</button>
    </div>
  );
};

export default ShowMoreButton;
