#说明  
```
npm install
npm start
```

##代码解释说明，本项目是flux的一个实现  
```
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
```  
<button onClick={()=>this.handleIncrease()}>增加</button>触发action=====>AppAction.increase();  
action里已经定义好AppDispatcher.dispatch({ actionType: "Increase" });  
分发到之前注册好的"Increase"事件  
```
AppDispatcher.register(function(action){
	switch(action.actionType){
		case "Increase":
			_increase();
			AppStore.emitChange();
			break;
    }
});  
```  
_increase();是将_value++;  
接着AppStore.emitChange();触发this.emit(CHANGE_EVENT);即触发'change'，而'change'是被绑定了  
```
addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
},

removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
}  
```  
这两个动作或者说事件this.on(CHANGE_EVENT, callback)，所以，一旦CHANGE_EVENT有点被触发，就会执行回调callback  
而组件通过AppStore.addChangeListener(this._onChange.bind(this));关联了AppStore对象addChangeListener的方法  
所以CHANGE_EVENT对应的回调callback是this._onChange.bind(this)，最终触发  
```
_onChange (){
    this.setState({
        value: AppStore.getValue()
    });
}
```  
这里仍是去取AppStore里面的值。
 