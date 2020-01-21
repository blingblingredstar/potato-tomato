import { ADD_TOMATO } from "../actions/actionTypes";

const tomatoes = (state = [], action = { type: "", payload: {} }) => {
  switch (action.type) {
    case ADD_TOMATO:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default tomatoes;
