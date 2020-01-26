import React, { useEffect } from "react";
import TodoInput from "../redux/containers/TodoInputContainer";

import axios from "../../config/axios";

import "./Todos.scss";
import { AxiosResponse } from "axios";
import TodoItem from "../redux/containers/TodoItemContainers";

interface IGetTodos {
  resources: ITodo[];
}

export interface IAddTodoParams {
  description: string;
}

interface ITodosProps {
  todos: ITodo[];
  initTodos: (todos: ITodo[]) => {};
}

export interface ITodo {
  description?: string;
  id?: number;
  completed?: boolean;
  editing?: boolean;
  deleted?: boolean;
  completed_at?: string;
  updated_at?: number;
  finished?: boolean;
}

const Todos: React.FC<ITodosProps> = props => {
  const { todos, initTodos } = props;
  useEffect(() => {
    const getTodos = async () => {
      try {
        const response: AxiosResponse<IGetTodos> = await axios.get("todos");
        const newTodos: ITodo[] = response.data.resources.map(t => ({
          ...t,
          editing: false
        }));
        initTodos(newTodos);
      } catch (e) {
        console.error("获取待办事项失败", e);
      }
    };
    getTodos();
  }, [initTodos]);

  const unDeletedTodos = todos.filter(todo => !todo.deleted);
  const unCompletedTodos = unDeletedTodos.filter(todo => !todo.completed);

  return (
    <div className="Todos" id="Todos">
      <TodoInput />
      <div className="TodoList">
        {unCompletedTodos.map(todo => (
          <TodoItem key={todo.id} {...todo}></TodoItem>
        ))}
      </div>
    </div>
  );
};

export default Todos;
