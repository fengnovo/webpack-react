import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './js/store'

import App from './js/App'
import './css/index.scss'

ReactDOM.render(<Provider store={store}><App /></Provider>,document.getElementById('app'));
