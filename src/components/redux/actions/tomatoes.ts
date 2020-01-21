import { ITomato } from "../../Tomatoes/Tomatoes";
import { ADD_TOMATO } from "./actionTypes";

export const addTomato = (tomato: ITomato) => {
  return {
    type: ADD_TOMATO,
    payload: tomato
  };
};
