import React, { useState } from "react";
import { ITomato } from "./Tomatoes";
import CountDown from "./CountDown";
import StartTomato from "./StartTomato";
import InputDescription from "./InputDescription";
import { Icon, Modal } from "antd";

import axios from "../../config/axios";

import "./TomatoAction.scss";

interface ITomatoActionProps {
  unfinishedTomato: ITomato;
  updateTomato: (tomato: ITomato) => void;
  startTomato: () => void;
}

const TomatoAction: React.FC<ITomato & ITomatoActionProps> = props => {
  const { unfinishedTomato, updateTomato, startTomato } = props;
  const [hasFinished, setHasFinished] = useState(false);

  let content = <div />;

  if (!unfinishedTomato) {
    content = <StartTomato startTomato={startTomato}></StartTomato>;
  } else {
    const start_at = Date.parse(unfinishedTomato.started_at || "");
    const duration = unfinishedTomato.duration || 0;
    const finishedTime = duration + start_at;
    const timeNow = new Date().getTime();

    const showAbortConfirm = () => {
      return Modal.confirm({
        title: "您目前正在一个番茄工作时间中，要放弃这个番茄吗？",
        okText: "放弃次番茄",
        okType: "danger",
        cancelText: "继续番茄任务",
        onOk() {
          abortTomato();
        }
      });
    };

    const abortTomato = async () => {
      try {
        const response = await axios.put(`tomatoes/${unfinishedTomato.id}`, {
          aborted: true
        });
        updateTomato(response.data.resource);
        document.title = `番茄土豆`;
      } catch (e) {
        console.error("放弃番茄任务失败", e);
      }
    };

    if (timeNow - finishedTime > 0 || hasFinished) {
      content = (
        <div className="InputWrapper">
          <InputDescription
            unfinishedTomato={unfinishedTomato}
            updateTomato={updateTomato}
          />
          <Icon
            type="close-circle"
            className="abort"
            onClick={showAbortConfirm}
          />
        </div>
      );
    } else {
      const updateHasFinished = () => {
        setHasFinished(true);
      };

      content = (
        <div className="CountDownWrapper">
          <CountDown
            duration={duration}
            finishedTime={finishedTime}
            updateHasFinished={updateHasFinished}
          />
          <Icon
            type="close-circle"
            className="abort"
            onClick={showAbortConfirm}
          />
        </div>
      );
    }
  }

  return <div className="TomatoAction">{content}</div>;
};

export default TomatoAction;
