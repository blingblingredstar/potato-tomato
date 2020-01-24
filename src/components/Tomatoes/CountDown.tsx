import React, { useState, useEffect } from "react";

import "./CountDown.scss";

interface ICountDownProps {
  finishedTime: number;
  duration: number;
  updateHasFinished: () => void;
}

const CountDown: React.FC<ICountDownProps> = props => {
  const { finishedTime, updateHasFinished, duration } = props;
  const [timeNow, setTimeNow] = useState(new Date().getTime());

  const countDown = finishedTime - timeNow;
  const min = Math.floor(countDown / 1000 / 60);
  const sec = Math.floor((countDown / 1000) % 60);
  const time = `${min >= 10 ? min : "0" + min}:${sec >= 10 ? sec : "0" + sec}`;
  document.title = `${time} - 番茄土豆`;

  useEffect(() => {
    const id = setInterval(() => {
      setTimeNow(timeNow + 1000);
      if (countDown <= 1000) {
        document.title = `番茄土豆`;
        updateHasFinished();
      }
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [countDown, time, timeNow, updateHasFinished]);

  const width = `${(1 - countDown / duration) * 100}%`;

  return (
    <div className="CountDown">
      <span>{time}</span>
      <div className="progress" style={{ width }}></div>
    </div>
  );
};

export default CountDown;
