import React from "react";

import "./Counter.scss";

const Counter = ({ value, setValue }) => {
  return (
    <div className="counter">
      <div className="counter__inner">
        <button
          className="counter__btn"
          onClick={value > 1 ? () => setValue(value - 1) : null}
        >
          -
        </button>
        <input
          className="counter__value"
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button className="counter__btn" onClick={() => setValue(value + 1)}>
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
