import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/counterSlice";

const Counter = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
            <h2>Счетчик: {count}</h2>
            <button onClick={() => dispatch(decrement())} style={{ marginRight: "10px" }}>-</button>
            <button onClick={() => dispatch(increment())}>+</button>
        </div>
    );
};

export default Counter;
