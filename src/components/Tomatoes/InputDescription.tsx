import React, { KeyboardEvent, useState } from "react";
import { Input, Icon } from "antd";
import { ITomato } from "./Tomatoes";
import axios from "../../config/axios";

enum KeyCode {
  enter = 13
}

interface IInputDescriptionProps {
  unfinishedTomato: ITomato;
  updateTomato: (tomato: ITomato) => void;
}

const InputDescription: React.FC<IInputDescriptionProps> = props => {
  const { unfinishedTomato, updateTomato } = props;
  const [description, setDescription] = useState("");

  const addDescription = async () => {
    const ended_at = new Date();
    try {
      const response = await axios.put(`tomatoes/${unfinishedTomato.id}`, {
        description,
        ended_at
      });
      updateTomato(response.data.resource);
      setDescription("");
    } catch (e) {
      console.error("给番茄任务添加描述失败", e);
    }
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (description !== "" && e.keyCode === KeyCode.enter) {
      addDescription();
    }
  };

  return (
    <>
      <Input
        value={description}
        placeholder="请输入您刚刚完成的任务"
        onChange={e => {
          setDescription(e.target.value);
        }}
        onKeyUp={onKeyUp}
      />
    </>
  );
};

export default InputDescription;
