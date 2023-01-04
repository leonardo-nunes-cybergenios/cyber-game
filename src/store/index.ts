// import { createStore } from "redux";
import rootReducer from "./reducers/index";

// export const stores = createStore(rootReducer);

// ___________________________________________
// REDUX SAGA

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

// ...
import { helloSaga } from '../sagas'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(helloSaga)


///_______________________________

// function counterReducer(state = { value: 0 }, action) {
//   switch (action.type) {
//     case "counter/incremented":
//       return { value: state.value + 1 };
//     case "counter/decremented":
//       return { value: state.value - 1 };
//     default:
//       return state;
//   }
// }

// export const store = createStore(counterReducer);

// store.subscribe(() => console.log(store.getState()));
