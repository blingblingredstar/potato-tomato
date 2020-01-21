import { ADD_TODO, INIT_TODOS, UPDATE_TODO, EDIT_TODO } from "../actionTypes";
import { ITodo } from "../../Todos/Todos";
import { Reducer } from "react";

const todos: Reducer<ITodo[], any> = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case INIT_TODOS:
      return [...action.payload];
    case UPDATE_TODO:
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }
        return todo;
      });
    case EDIT_TODO:
      return state.map(todo => {
        if (todo.id === action.payload) {
          return { ...todo, editing: true };
        }
        return { ...todo, editing: false };
      });
    default:
      return state;
  }
};

export default todos;
