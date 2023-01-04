const INITIAL_STATE = 1;

const counter = (state = INITIAL_STATE, action = null) => {
  console.log("action", action);
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

export default counter;

// import { types } from "../actions/counter";
// import createReducer from "../../utils/createReducer";

// const initialState = {
//   open: false,
//   title: "",
//   message: "",
//   earnedCoins: 0,
//   onConfirm: () => {},
// };

// const reducer = {
//   [types.DECREMENT]: () => {
//     return ;
//   },
//   [types.INCREMENT]: () => {
//     return initialState;
//   },
//   [types.RESET]: () => {
//     return initialState;
//   },
// };

// export const infoModal = createReducer(initialState, reducer);
