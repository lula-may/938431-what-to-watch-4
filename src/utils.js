const HOUR = 60;
const DATE_STRING_LENGTH = 10;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

const extend = (a, b) => Object.assign({}, a, b);

const formatTime = (duration) => {
  const hours = Math.floor(duration / HOUR);
  const minutes = duration % HOUR;

  return (
    (hours > 0)
      ? `${hours}h ${minutes}m`
      : `${minutes}m`
  );
};

const getTwoDigitNumber = (number) => number < 10 && `0${number}` || `${number}`;

const formatElapsedTime = (durationInSeconds) => {
  const duration = Math.round(durationInSeconds);
  const hours = Math.floor(duration / SECONDS_IN_HOUR);
  const minutes = Math.floor(duration % SECONDS_IN_HOUR / SECONDS_IN_MINUTE);
  const seconds = duration % SECONDS_IN_MINUTE;
  return `${getTwoDigitNumber(hours)}:${getTwoDigitNumber(minutes)}:${getTwoDigitNumber(seconds)}`;
};

const formatDate = (date) => date.toLocaleString(`en-US`, {day: `numeric`, month: `long`, year: `numeric`});

const formatDateTimeAttribute = (date) => date.toISOString().slice(0, DATE_STRING_LENGTH);

export {extend, formatDate, formatTime, formatDateTimeAttribute, formatElapsedTime};
