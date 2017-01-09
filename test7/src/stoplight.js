import React, { Component } from 'react';
 
const stopColor = (state) => {
  return state == 'STOP' ? 'red' : 'white';
}
 
const cautionColor = (state) => {
  return state == 'CAUTION' ? 'yellow' : 'white';
}
 
const goColor = (state) => {
  return state == 'GO' ? 'rgb(39,232,51)' : 'white';
}
 
export const Stoplight = ({
  store
}) => {
  const state = store.getState();
 
  return(
    <div style={{textAlign: 'center'}}>
      <svg height='170'>
        <circle cx='145' cy='60' r='15'
                fill={stopColor(state)}
                stroke='black'/>
 
        <circle cx='145' cy='100' r='15'
                fill={cautionColor(state)}
                stroke='black'/>
 
        <circle cx='145' cy='140' r='15'
                fill={goColor(state)}
                stroke='black'/>
 
      </svg>
    </div>
  )
}