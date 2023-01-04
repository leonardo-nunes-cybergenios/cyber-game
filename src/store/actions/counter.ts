export const types = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
};

const actions = {
  onIncrement: (number = 0) => ({
    type: types.INCREMENT,
    number,
  }),
  onDecrement: () => ({
    type: types.DECREMENT,
  }),
};

export default actions;
