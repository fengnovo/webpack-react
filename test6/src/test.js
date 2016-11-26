var redux = require('redux');

const ActionTypes = {
	ALL : 'ALL'
}
// const initState = {
// 	users : []
// }

function getUsers (state = {
	users : []
},action) {
	// state = state || initState;
	switch (action.type) {
		case ActionTypes.ALL :
			return Object.assign({},state,{
				users: [1,2,3],
				date: action.data
			});
		default :
			return state
	}
}

var store = redux.createStore(getUsers);
console.log(store.getState());

// store.subscribe(function(){
// 	var currentState = store.getState();
// 	currentState.users.push(4,5,6);
// })

function all() {
	return {
		type: 'ALL'
	}
}

store.dispatch(all());
console.log(store.getState());