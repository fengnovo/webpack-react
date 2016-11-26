import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider,connect} from 'react-redux'

class MyComponent extends React.Component {
	render () {
		return (
			<div className="index">
				<p>{this.props.text}</p>
				<input defaultValue={this.props.name} onChange={this.props.onChange} />
			</div>
		)
	}
}

function mapStateToProps (state){
	return {
		text: state.text,
		name: state.name
	}
}

function mapDispatchToProps(dispatch){
	return {
		onChange: (e) => dispatch({
			type: 'change',
			payload: e.target.value
		})
	}
}

function reducer (state = {
	text: 'Hello fengnovo',
	name: 'fengnovo'
},action) {
	switch (action.type) {
		case 'change': 
			console.log('Hello,'+ action.payload);
			return {
				name: action.payload,
				text: 'Hello '+ action.payload
			};
		default :
			return state;
	}
} 

const store = createStore(reducer);

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(MyComponent);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.body.appendChild(document.createElement('div'))
)