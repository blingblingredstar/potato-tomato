import React from "react";
import { ITomato } from "./Tomatoes";
import { Dictionary } from "lodash";
import TomatoItem from "./TomatoItem";

import "./TomatoList.scss";
import { format } from "date-fns";

interface ITomatoListProps {
  finishedTomatoes: Dictionary<ITomato[]>;
}

const TomatoList: React.FC<ITomatoListProps> = ({ finishedTomatoes }) => {
  const dates: Array<keyof Dictionary<ITomato[]>> = Object.keys(
    finishedTomatoes
  )
    .sort((a, b) => Date.parse(b) - Date.parse(a))
    .splice(0, 3);

  return (
    <div className="TomatoList">
      {dates.map(date => {
        const tomatoes = finishedTomatoes[date];
        return (
          <div key={date}>
            <div className="title">
              <span className="date">
                {format(new Date(date), "yyyy年MM月dd日")}
              </span>
              <span className="count">完成{tomatoes.length}个番茄任务</span>
            </div>
            {tomatoes.map(tomato => (
              <TomatoItem key={tomato.id} tomato={tomato} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default TomatoList;
