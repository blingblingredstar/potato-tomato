import React, { useState, KeyboardEvent } from "react";
import { Input, Icon } from "antd";
import { IAddTodoParams } from "./Todos";

import "./TodoInput.scss";

enum KeyCode {
  enter = 13
}

interface ITodoInputProps {
  addTodo: (params: IAddTodoParams) => void;
}

const TodoInput = (props: ITodoInputProps) => {
  const [description, setDescription] = useState("");

  const addTodo = () => {
    if (!description) {
      return;
    }
    props.addTodo({ description });
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
