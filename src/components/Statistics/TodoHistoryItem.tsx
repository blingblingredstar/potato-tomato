import React from "react";
import { ITodo } from "../Todos/Todos";
import { format } from "date-fns";
import axios from "../../config/axios";

import "./TodoHistoryItem.scss";

interface ITodoHistoryItemProps extends ITodo {
  updateTodo: (todo: ITodo) => {};
  deleted: boolean;
  finished: boolean;
}

const TodoHistoryItem: React.FC<ITodoHistoryItemProps> = ({
  description,
  updated_at,
  updateTodo,
  deleted,
  finished,
  id
}) => {
  const updateTodoAsync = async (todo: ITodo) => {
    try {
      const response = await axios.put(`todos/${id}`, todo);
      updateTodo(response.data.resource);
    } catch (e) {
      console.error("更新Todo失败", e);
    }
  };

  const FinishedAction = (
    <div className="action">
      <span
        onClick={() => {
          updateTodoAsync({ finished: false });
        }}
      >
        恢复
      </span>
      <span
        onClick={() => {
          updateTodoAsync({ deleted: true });
        }}
      >
        删除
      </span>
    </div>
  );

  const DeletedAction = (
    <div className="action">
      <span
        onClick={() => {
          updateTodoAsync({ deleted: false });
        }}
      >
        恢复
      </span>
    </div>
  );

  return (
    <div className="TodoHistoryItem">
      <div className="text">
        <span>{format(new Date(updated_at || 0), "HH:MM")}</span>
        <span>{description}</span>
      </div>

      {deleted ? DeletedAction : ""}
      {finished ? FinishedAction : ""}
    </div>
  );
};

export default TodoHistoryItem;
