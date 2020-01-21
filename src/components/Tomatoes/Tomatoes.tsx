import React from "react";

import "./Tomatoes.scss";
import TomatoAction from "./TomatoAction";

export interface ITomato {
  aborted?: boolean;
  created_at?: string;
  description?: string;
  duration?: number;
  ended_at?: number;
  extra?: object;
  id?: number;
  manually_created?: string;
  started_at?: string;
  updated_at?: string;
  user_id?: number;
}

const Tomatoes: React.FC = () => {
  return (
    <div className="Tomatoes">
      番茄闹钟
      <TomatoAction></TomatoAction>
    </div>
  );
};

export default Tomatoes;
