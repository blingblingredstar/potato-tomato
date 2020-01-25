import React from "react";
import { ITomato } from "./Tomatoes";
import { format } from "date-fns";

import "./TomatoItem.scss";

interface ITomatoItemProps {
  tomato: ITomato;
}

const TomatoItem: React.FC<ITomatoItemProps> = ({ tomato }) => {
  const started_at = format(new Date(tomato.started_at || 0), "HH:mm");
  const ended_at = format(new Date(tomato.ended_at || 0), "HH:mm");

  return (
    <div className="TomatoItem">
      <span className="time">
        {started_at} - {ended_at}
      </span>
      <span className="description">{tomato.description}</span>
    </div>
  );
};

export default TomatoItem;
