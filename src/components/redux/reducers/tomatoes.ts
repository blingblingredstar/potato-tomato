import {
  ADD_TOMATO,
  INIT_TOMATOES,
  UPDATE_TOMATO
} from "../actions/actionTypes";
import { ITomato } from "../../Tomatoes/Tomatoes";

const tomatoes = (state: ITomato[] = [], action: any) => {
  switch (action.type) {
    case ADD_TOMATO:
      return [...state, action.payload];
    case INIT_TOMATOES:
      return [...action.payload];
    case UPDATE_TOMATO:
      return state.map(tomato => {
        if (tomato.id === action.payload.id) {
          return action.payload;
        }
        return tomato;
      });
    default:
      return state;
  }
};

export default tomatoes;
