import { ADD_TODO, INIT_TODOS, UPDATE_TODO, EDIT_TODO } from "./actionTypes";
import { ITodo } from "../Todos/Todos";

export const addTodo = (todo: ITodo) => {
  return {
    type: ADD_TODO,
    payload: todo
  };
};

export const initTodos = (todos: ITodo[]) => {
  return {
    type: INIT_TODOS,
    payload: todos
  };
};

export const updateTodo = (todo: ITodo) => {
  return {
    type: UPDATE_TODO,
    payload: todo
  };
};

export const editTodo = (id: number) => {
  return {
    type: EDIT_TODO,
    payload: id
  };
};
