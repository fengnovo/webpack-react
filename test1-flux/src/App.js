import React from 'react'
import flux from 'flux'
import EventEmitter from 'events'
import assign from 'object-assign'

//dispatch
var Dispatcher = flux.Dispatcher;
var AppDispatcher = new Dispatcher();

//action
var AppAction = {
	increase: function(){
		AppDispatcher.dispatch({
			actionType: "Increase"
		});
	},

	decrease: function(){
		AppDispatcher.dispatch({
			actionType: "Decrease"
		});
	}
};


//stores
var CHANGE_EVENT = 'change';
var _value = 0;

function _increase(){
	_value++;
}

function _decrease(){
	_value--;
}

var AppStore = assign({}, EventEmitter.prototype, {
	getValue: function(){
		return _value;
	},

	emitChange: function() {
    	this.emit(CHANGE_EVENT);
  	},
  
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

  	removeChangeListener: function(callback) {
    	this.removeListener(CHANGE_EVENT, callback);
  	}
});

AppDispatcher.register(function(action){
	switch(action.actionType){
		case "Increase":
			_increase();
			AppStore.emitChange();
			break;
		case "Decrease":
			_decrease();
			AppStore.emitChange();
			break;
		default:
	}
});



class App extends React.Component {
	constructor (props) {
		super(props)
		console.log(AppStore);
		this.state = {
			value: AppStore.getValue()
		}

	}

	componentDidMount () {
    	AppStore.addChangeListener(this._onChange.bind(this));
	}

  	componentWillUnmount () {
    	AppStore.removeChangeListener(this._onChange.bind(this));
  	}

    handleIncrease (){
		AppAction.increase();
	}

	handleDecrease (){
		AppAction.decrease();
	}

    _onChange (){
		this.setState({
			value: AppStore.getValue()
		});
	}

	render (){
		return(
			<div>
                <div>
                    <section>
                        <button onClick={()=>this.handleIncrease()}>增加</button>
                        <button onClick={()=>this.handleDecrease()}>减少</button>
                    </section>
                </div>
                <div>{this.state.value}</div>		
			</div>
		);
	}
}

export default App