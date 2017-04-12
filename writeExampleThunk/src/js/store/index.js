import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger }  from 'redux-logger';
import { reducers } from '../reducers';

let createStoreWithMiddleware;
const logger = createLogger();
createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    logger
)(createStore);

// export default function configureStore(initialState) {
//   const store = createStoreWithMiddleware(rootReducer, initialState);
//   if (module.hot) {
//     module.hot.accept('./reducers', () => {
//       const nextRootReducer = require('./reducers/index');
//       store.replaceReducer(nextRootReducer);
//     });
//   }
//   return store;
// }

const store = createStoreWithMiddleware(reducers);

export default store