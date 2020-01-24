import { ITomato } from "../../Tomatoes/Tomatoes";
import { ADD_TOMATO, INIT_TOMATOES, UPDATE_TOMATO } from "./actionTypes";

export const addTomato = (tomato: ITomato) => {
  return {
    type: ADD_TOMATO,
    payload: tomato
  };
};

export const initTomatoes = (tomatoes: ITomato[]) => {
  return {
    type: INIT_TOMATOES,
    payload: tomatoes
  };
};

export const updateTomato = (tomato: ITomato) => {
  return {
    type: UPDATE_TOMATO,
    payload: tomato
  };
};
