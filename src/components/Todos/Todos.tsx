import React from "react";
import TodoInput from "./TodoInput";

import axios from "../../config/axios";

import "./Todos.scss";

export interface IAddTodoParams {
  description: string;
}

const Todos = () => {
  const addTodo = async (params: IAddTodoParams) => {
    try {
      const response = await axios.post("todos", params);
      console.log(response.data);
    } catch (e) {
      console.error("添加待办事项失败", e);
    }
  };

  return (
    <div className="Todos" id="Todos">
      <TodoInput
        addTodo={params => {
          addTodo(params);
        }}
      />
    </div>
  );
};

export default Todos;
