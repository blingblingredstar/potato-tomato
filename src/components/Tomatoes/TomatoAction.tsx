import React from "react";
import { Button } from "antd";

import axios from "../../config/axios";

enum Tomatoes {
  duration = 25 * 60 * 1000
}

interface ITomato {
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

const TomatoAction: React.FC = () => {
  const startTomato = async () => {
    try {
      const response = await axios.post("tomatoes", {
        duration: Tomatoes.duration
      });
      console.log(response.data);
    } catch (e) {
      console.error("更新番茄闹钟失败", e);
    }
  };

  return (
    <div className="TomatoAction">
      TomatoAction
      <Button onClick={startTomato}>开始番茄</Button>
    </div>
  );
};

export default TomatoAction;
