import React, { useState, useEffect } from 'react';
import toDuration from '../utils/toDuration';

const CountdownTimer = ({ timeStart, timeEnd }) => {
  const totalDuration = toDuration(timeStart, timeEnd);
  const durationLeft = toDuration(new Date().toString(), timeEnd);

  const [originalTime] = useState(
    totalDuration.hours * 60 * 60 +
      totalDuration.minutes * 60 +
      totalDuration.secs * 1
  );
  const [hours, setHours] = useState(durationLeft.hours * 1);
  const [minutes, setMinutes] = useState(durationLeft.minutes * 1);
  const [seconds, setSeconds] = useState(durationLeft.secs * 1);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(Math.floor(seconds - 1));
      } else {
        if (minutes === 0) {
          if (hours === 0) clearInterval(myInterval);
          else {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className=''>
      <div className='flex items-center justify-between mb-1'>
        <div>
          <span
            className={`text-sm font-semibold inline-block py-1 px-3 uppercase rounded-full 
            text-orange-50 bg-orange-800`}
          >
            <i className='fas fa-hourglass hover:animate-spin' />
          </span>
        </div>
        <div className='text-right'>
          <span className={`text-lg font-semibold inline-block text-orange-50`}>
            {minutes === 0 && seconds === 0 ? (
              '00:00:00'
            ) : (
              <div>
                {hours}:{minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </div>
            )}
          </span>
        </div>
      </div>
      <div className={`overflow-hidden h-7 flex rounded-full bg-orange-100`}>
        <div
          style={{
            width: `${
              (Math.floor(hours * 60 * 60 + minutes * 60 + seconds) /
                originalTime) *
              100
            }%`,
            transition: 'width 0.5s',
          }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-orange-600`}
        ></div>
      </div>
    </div>
  );
};

export default CountdownTimer;
