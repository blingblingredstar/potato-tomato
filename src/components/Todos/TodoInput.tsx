import React, { useState, KeyboardEvent } from "react";
import { Input, Icon } from "antd";
import axios from "../../config/axios";

import "./TodoInput.scss";
import { ITodo } from "./Todos";

enum KeyCode {
  enter = 13
}

interface ITodoInputProps {
  addTodo: (payload: ITodo) => {};
}

const TodoInput: React.FC<ITodoInputProps> = props => {
  const [description, setDescription] = useState("");

  const addTodo = async () => {
    if (!description) {
      return;
    }
    try {
      const response = await axios.post("todos", { description });
      props.addTodo(response.data.resources);
    } catch (e) {
      console.error("添加待办事项失败", e);
    }
    setDescription("");
  };

  const suffix = description ? (
    <Icon type="enter" onClick={addTodo} />
  ) : (
    <span />
  );

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === KeyCode.enter) {
      addTodo();
    }
  };

  return (
    <div className="TodoInput">
      <Input
        placeholder="请输入待办事项"
        suffix={suffix}
        value={description}
        onChange={e => {
          setDescription(e.target.value || "");
        }}
        onKeyUp={onEnter}
      />
    </div>
  );
};

export default TodoInput;
