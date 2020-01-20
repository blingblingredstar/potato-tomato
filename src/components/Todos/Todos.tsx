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
  editing?: boolean;
  deleted?: boolean;
}

const Todos = () => {
  const [todos, setTodos] = useState((): Array<ITodo> => []);

  const addTodo = async (params: IAddTodoParams) => {
    try {
      const response = await axios.post("todos", params);
      setTodos([{ ...response.data.resource, editing: false }, ...todos]);
    } catch (e) {
      console.error("添加待办事项失败", e);
    }
  };

  const updateTodo = async (params: ITodo) => {
    try {
      const { id, ...res } = params;
      const response = await axios.put(`todos/${id}`, res);
      const newTodos: ITodo[] = todos.map(todo => {
        if (todo.id === id) {
          return { ...response.data.resource, editing: false };
        }
        return todo;
      });

      setTodos(newTodos);
    } catch (e) {
      console.error("更新待办事项失败", e);
    }
  };

  const toggleItemEditing = (id: number | undefined) => {
    const newTodos = todos.map(todo => {
      return todo.id === id
        ? { ...todo, editing: true }
        : { ...todo, editing: false };
    });
    setTodos(newTodos);
  };

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get("todos");
        const newTodos = response.data.resources.map((todo: ITodo) =>
          Object.assign({}, todo, { editing: false })
        );
        setTodos(newTodos);
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
          <TodoItem
            key={todo.id}
            {...todo}
            update={updateTodo}
            toggleEditing={toggleItemEditing}
          ></TodoItem>
        ))}
      </main>
    </div>
  );
};

export default Todos;
