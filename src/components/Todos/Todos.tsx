import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput";

import axios from "../../config/axios";

import "./Todos.scss";
import TodoItem from "./TodoItem";

export interface IAddTodoParams {
  description: string;
}

export interface ITodo {
  description?: string;
  id?: number;
  completed?: boolean;
}

const Todos = () => {
  const [todos, setTodos] = useState((): Array<ITodo> => []);

  const addTodo = async (params: IAddTodoParams) => {
    try {
      const response = await axios.post("todos", params);
      setTodos([response.data.resource, ...todos]);
    } catch (e) {
      console.error("添加待办事项失败", e);
    }
  };

  const updateTodo = async (params: ITodo) => {
    try {
      const { id, ...res } = params;
      const response = await axios.put(`todos/${id}`, res);
      const newTodos = todos.map(todo => {
        if (todo.id === id) {
          return response.data.resource;
        }
        return todo;
      });

      setTodos(newTodos);
    } catch (e) {
      console.error("更新待办事项失败", e);
    }
  };

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get("todos");
        setTodos(response.data.resources);
      } catch (e) {
        console.error("获取待办事项失败", e);
      }
    };
    getTodos();
  }, []);

  return (
    <div className="Todos" id="Todos">
      <TodoInput
        addTodo={params => {
          addTodo(params);
        }}
      />
      <main>
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} update={updateTodo}></TodoItem>
        ))}
      </main>
    </div>
  );
};

export default Todos;
