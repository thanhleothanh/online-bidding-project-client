const toDuration = (timeStart, timeEnd) => {
  let diffTime = Math.abs(
    new Date(timeEnd).valueOf() - new Date(timeStart).valueOf()
  );
  let days = diffTime / (24 * 60 * 60 * 1000);
  let hours = (days / 1) * 24;
  let minutes = (hours % 1) * 60;
  let secs = (minutes % 1) * 60;
  return {
    hours: Math.floor(hours),
    minutes: Math.floor(minutes),
    secs: Math.floor(secs),
  };
};

export default toDuration;
