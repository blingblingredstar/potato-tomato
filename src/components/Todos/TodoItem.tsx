import React, { useState, KeyboardEvent } from "react";
import { ITodo } from "./Todos";
import { Checkbox, Input, Icon } from "antd";

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

  const Editing = (
    <div className="editing">
      <Input
        value={editText}
        onDoubleClick={toggleEditing}
        onChange={e => {
          setEditText(e.target.value);
        }}
        onKeyUp={keyUpHandler}
      />
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
    </div>
  );

  const Text = <span onDoubleClick={toggleEditing}>{props.description}</span>;

  return (
    <div className="TodoItem">
      <Checkbox
        checked={props.completed}
        onChange={e => {
          props.update({ completed: e.target.checked, id: props.id });
        }}
      />
      {props.editing ? Editing : Text}
    </div>
  );
};

export default TodoItem;
