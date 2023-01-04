import { useDispatch, useSelector } from "react-redux";
import actionCalc from './store/actions/counter'
import actionUser from './store/actions/user'

type actionProp = {
  counter: number
  user: Record<string, string>
}

function Redux() {
  const { counter, user } = useSelector((state: actionProp) => state)
  const store = useSelector((state: actionProp) => state)
  const dispatch = useDispatch()

  console.log('store: ', store)
  // console.log('Counter: ', counter)
  // console.log('User: ', user)

  function increment() {
    dispatch(actionCalc.onIncrement())
  }

  function decrement() {
    dispatch(actionCalc.onDecrement())
  }

  // function reset (){
  //   dispatch(actionCalc.onReset())
  // }

  return (
    <div>
      <div>Redux man</div>
      <button onClick={decrement}>MENOS</button>
      <button onClick={increment}>MAIS</button>
    </div>
  );
}

export default Redux;
