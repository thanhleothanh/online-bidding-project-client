import toDuration from './toDuration';

const toTimePassed = (updatedAt) => {
  const timePassed = toDuration(updatedAt, new Date().toString());
  if (timePassed.hours >= 24)
    return `About ${Math.round(timePassed.hours / 24)} days ago`;
  else if (timePassed.hours >= 1)
    return `About ${Math.round(timePassed.hours / 1)} hours ago`;
  else if (timePassed.minutes >= 1)
    return `About ${Math.round(timePassed.minutes / 1)} minutes ago`;
  else return `Just now`;
};

export default toTimePassed;
