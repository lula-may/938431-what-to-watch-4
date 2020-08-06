import * as React from "react";
import {Link} from "react-router-dom";

import {formatElapsedTime} from "../../utils";
import {Movie} from "../../types";
import {AppRoute} from "../../const";

interface Props {
  children: React.ReactNode;
  elapsedTime: number;
  isPlaying: boolean;
  movie: Movie;
  onFullScreenButtonClick: () => void;
  onPlayButtonClick: () => void;
  progressValue: number;
}

const Player: React.FC<Props> = (props: Props) => {
  const {
    children,
    isPlaying,
    movie: {id},
    onFullScreenButtonClick,
    onPlayButtonClick,
    progressValue,
    elapsedTime,
  } = props;
  const elapsedTimeFormated = formatElapsedTime(elapsedTime);
  return (
    <div className="player">
      {children}
      <Link to={`${AppRoute.FILMS}/${id}`} className="player__exit" style={{textDecoration: `none`}}>Exit</Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progressValue} max="100"></progress>
            <div className="player__toggler" style={{left: `${progressValue}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{elapsedTimeFormated}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={onPlayButtonClick}>
            {isPlaying
              ? <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"></use>
              </svg>

              : <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
            }
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={onFullScreenButtonClick}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
