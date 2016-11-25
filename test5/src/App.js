import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

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

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(MyComponent);

export default App;