import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { increment, decrement, reset, incrementByAmount } from './counterSlice';
import { useState } from 'react';

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const [incrementAmount, setIncrementAmount] = useState(0);

  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };

  return (
    <section>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <input type="number" value={incrementAmount} onChange={(e) => setIncrementAmount(parseInt(e.target.value))} />
      <div>
        <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>Add amount</button>
        <button onClick={() => dispatch(resetAll)}>Reset</button>
      </div>
    </section>
  );
};
export default Counter;
