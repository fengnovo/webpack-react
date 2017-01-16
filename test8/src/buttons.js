// import React, { Component } from 'react';
// import { goAction, cautionAction, stopAction } from './actions';
 
// export const Buttons = ({ store }) => {
//   const state = store.getState();
  
//   return(
//     <div style={{textAlign: 'center'}}>
//       <button onClick={() => {store.dispatch(goAction)}}
//               disabled={state == 'GO' || state == 'CAUTION'}
//               style={{cursor: 'pointer'}}>
//         Go
//       </button>
 
//       <button onClick={() => {store.dispatch(cautionAction)}}
//               disabled={state == 'CAUTION' || state == 'STOP'}
//               style={{cursor: 'pointer'}}>
//         Caution
//       </button>
 
//       <button onClick={() => {store.dispatch(stopAction)}}
//               disabled={state == 'STOP' || state == 'GO'}
//               style={{cursor: 'pointer'}}>
//         Stop
//       </button>
//     </div>
 
//   )
// }





'use strict';
 
import React, { Component } from 'react';
import { goAction, cautionAction, stopAction } from './actions';
 
export class Buttons extends Component {
  componentWillMount() {
    this.props.store.subscribe(() => {
      this.forceUpdate();
    });
  }
 
  render() {
    const state = this.props.store.getState();
 
    return(
      <div style={{textAlign: 'center'}}>
        <button onClick={() => {this.props.store.dispatch(goAction)}}
                disabled={state == 'GO' || state == 'CAUTION'}
                style={{cursor: 'pointer'}}>
          Go
        </button>
 
        <button onClick={() => {this.props.store.dispatch(cautionAction)}}
                disabled={state == 'CAUTION' || state == 'STOP'}
                style={{cursor: 'pointer'}}>
          Caution
        </button>
 
        <button onClick={() => {this.props.store.dispatch(stopAction)}}
                disabled={state == 'STOP' || state == 'GO'}
                style={{cursor: 'pointer'}}>
          Stop
        </button>
      </div>
    )
  }
}