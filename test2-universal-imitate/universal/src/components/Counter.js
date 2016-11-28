import React, { Component, PropTypes } from 'react'

const Counter = ({increment, incrementIfOdd, incrementAsync, decrement, counter}) => (
  <p>
    被点击了: {counter} 次
    {' '}
    <button onClick={increment}>+</button>
    {' '}
    <button onClick={decrement}>-</button>
    {' '}
    <button onClick={incrementIfOdd}>如果次数是奇数加一</button>
    {' '}
    <button onClick={() => incrementAsync()}>延时一秒加一</button>
  </p>
)

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
}

export default Counter
