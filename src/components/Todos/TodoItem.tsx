import React, { useState, KeyboardEvent } from "react";
import { ITodo } from "./Todos";
import { Checkbox, Icon } from "antd";

import axios from "../../config/axios";

import "./TodoItem.scss";

interface ITodoItemProps {
  updateTodo: (todo: ITodo) => {};
  editTodo: (id: number) => {};
}

enum KeyCode {
  enter = 13
}

const TodoItem = (props: ITodo & ITodoItemProps) => {
  const [editText, setEditText] = useState(props.description || "");

  const toggleEditing = () => {
    if (props.id) props.editTodo(props.id);
  };

  const keyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (editText !== "" && e.keyCode === KeyCode.enter) {
      updateTodo({ description: editText, id: props.id });
    }
  };

  const updateTodo = async (params: ITodo) => {
    try {
      const response = await axios.put(`todos/${props.id}`, params);
      props.updateTodo(response.data.resource);
    } catch (e) {
      console.error("更新待办事项失败", e);
    }
  };

  const Icons = (
    <div className="iconWrapper">
      <Icon
        type="enter"
        onClick={() => {
          updateTodo({ description: editText, id: props.id });
        }}
      />
      <Icon
        type="delete"
        theme="filled"
        onClick={() => {
          updateTodo({ deleted: true });
        }}
      />
    </div>
  );

  const Check = (
    <Checkbox
      checked={props.completed}
      onChange={e => {
        updateTodo({
          completed: e.target.checked,
          id: props.id,
          completed_at: new Date().toUTCString()
        });
      }}
    />
  );

  const Editing = (
    <div className="editing">
      <input
        value={editText}
        onChange={e => {
          setEditText(e.target.value);
        }}
        onKeyUp={keyUpHandler}
      />
      {Icons}
    </div>
  );

  const Text = (
    <span className="text" onDoubleClick={toggleEditing}>
      {props.description}
    </span>
  );

  const className =
    "TodoItem" +
    (props.editing ? " editing" : "") +
    (props.completed ? " completed" : "");

  return (
    <div className={className}>
      {Check}
      {props.editing ? Editing : Text}
    </div>
  );
};

export default TodoItem;
