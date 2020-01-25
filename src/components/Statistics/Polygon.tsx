import React, { useState } from "react";
import { ITodo } from "../Todos/Todos";
import { Dictionary } from "lodash";

interface IPolygonProps {
  data: Dictionary<ITodo[]>;
  totalFinishedCount: number;
}

const Polygon: React.FC<IPolygonProps> = ({ data, totalFinishedCount }) => {
  const points = () => {
    const dates = Object.keys(data).sort(
      (a, b) => Date.parse(a) - Date.parse(b)
    );

    const firstDay = dates[0];
    if (firstDay) {
      let finishedCount = 0;

      const lastDay = dates[dates.length - 1];
      const range = Date.parse(lastDay) - Date.parse(firstDay);
      const pointsArr = dates.map(date => {
        const x = ((Date.parse(date) - Date.parse(firstDay)) / range) * 240;
        finishedCount += data[date].length;
        const y = (1 - finishedCount / totalFinishedCount) * 60;
        return `${x},${y}`;
      });
      return ["0,60", ...pointsArr, "240,60"].join(" ");
    } else {
      return "0,60 240,60";
    }
  };

  return (
    <div className="Polygon">
      <svg>
        <polygon
          fill="rgba(215, 78, 78, 0.1)"
          stroke="rgba(215, 78, 78, 0.5)"
          strokeWidth="1"
          points={points()}
        ></polygon>
      </svg>
    </div>
  );
};

export default Polygon;
