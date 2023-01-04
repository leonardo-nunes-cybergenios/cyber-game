import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actionCalc from './store/actions/counter'
import actionUser from './store/actions/user'
// import { helloSaga } from './sagas'

// type actionProp = {
//   counter: number
//   user: Record<string, string>
// }

import { store } from './store/index'

function SagaRedux() {
  // const { counter } = useSelector(some => some)
  const action = type => store.dispatch({ type })

  const [formik, setForm] = useState<Record<string, string>>({ name: 'leo' })
  const [val, setVal] = useState(1)

  // setForm(state => {...state})

  function Set() {
    // debugger
    const leo = 'leo'
    setVal(val => val + 1)
    setForm({ ...formik, [leo]: `${val}` })
    // setForm(state => { return { ...state, leo: 'onardo' } })
  }
  console.log(formik)

  function onIncrement() {
    action('INCREMENT')
    console.log(store.getState().counter)

    // console.log(counter)
  }
  function onDecrement() { action('DECREMENT') }

  // function increment() {
  //   dispatch(actionCalc.onIncrement())
  // }

  // function decrement() {
  //   dispatch(actionCalc.onDecrement())
  // }

  return (
    <div>
      <div>Saga Redux</div>
      <button onClick={Set}>form</button>
      <button onClick={onDecrement}>MENOS</button>
      <button onClick={onIncrement}>MAIS</button>
    </div>
  );
}

export default SagaRedux;
