import React, { useState, KeyboardEvent } from "react";
import { ITodo } from "./Todos";
import { Checkbox, Icon } from "antd";

import "./TodoItem.scss";

interface ITodoItemProps {
  update: (params: ITodo) => void;
  toggleEditing: (params: number | undefined) => void;
}

enum KeyCode {
  enter = 13
}

const TodoItem = (props: ITodo & ITodoItemProps) => {
  const [editText, setEditText] = useState(props.description || "");

  const toggleEditing = () => {
    props.toggleEditing(props.id);
  };

  const keyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (editText !== "" && e.keyCode === KeyCode.enter) {
      props.update({ description: editText, id: props.id });
    }
  };

  const Icons = (
    <div className="iconWrapper">
      <Icon
        type="enter"
        onClick={() => {
          props.update({ description: editText, id: props.id });
        }}
      />
      <Icon
        type="delete"
        theme="filled"
        onClick={() => {
          props.update({ deleted: true, id: props.id });
        }}
      />
    </div>
  );

  const Check = (
    <Checkbox
      checked={props.completed}
      onChange={e => {
        props.update({ completed: e.target.checked, id: props.id });
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
