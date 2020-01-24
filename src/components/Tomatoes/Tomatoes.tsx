import React, { useEffect } from "react";
import axios from "../../config/axios";

import "./Tomatoes.scss";
import TomatoAction from "./TomatoAction";

enum ETomatoes {
  duration = 25 * 60 * 1000
}

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

interface ITomatoesProps {
  tomatoes: ITomato[];
  addTomato: (tomato: ITomato) => void;
  initTomatoes: (tomatoes: ITomato[]) => void;
  updateTomato: (tomato: ITomato) => void;
}

const Tomatoes: React.FC<ITomatoesProps> = props => {
  const { tomatoes, addTomato, initTomatoes, updateTomato } = props;

  const startTomato = async () => {
    try {
      const response = await axios.post("tomatoes", {
        duration: ETomatoes.duration
      });
      addTomato(response.data.resource);
    } catch (e) {
      console.error("更新番茄闹钟失败", e);
    }
  };

  const unfinishedTomato = () =>
    tomatoes.filter(
      tomato => !tomato.description && !tomato.ended_at && !tomato.aborted
    )[0];

  useEffect(() => {
    const getTomatoes = async () => {
      try {
        const response = await axios.get("tomatoes");
        initTomatoes(response.data.resources);
      } catch (e) {
        console.error("获取番茄闹钟列表失败", e);
      }
    };
    getTomatoes();
  }, [initTomatoes]);

  return (
    <div className="Tomatoes">
      <TomatoAction
        startTomato={startTomato}
        unfinishedTomato={unfinishedTomato()}
        updateTomato={updateTomato}
      ></TomatoAction>
    </div>
  );
};

export default Tomatoes;
