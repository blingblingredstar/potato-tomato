import React from "react";
import { ITodo } from "./Todos";
import { Checkbox } from "antd";

interface ITodoItemProps {
  update: (params: ITodo) => void;
}

const TodoItem = (props: ITodo & ITodoItemProps) => {
  return (
    <div className="TodoItem">
      <Checkbox
        checked={props.completed}
        onChange={e => {
          props.update({ completed: e.target.checked, id: props.id });
        }}
      />
      <span>{props.description}</span>
    </div>
  );
};

export default TodoItem;
