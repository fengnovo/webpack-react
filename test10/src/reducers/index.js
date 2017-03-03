import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const todoApp = combineReducers({
    todos,
    visibilityFilter
}) 
/*一开始是有两个东西传入默认为整棵树的state
{
    todos: [],                      //-->来自todos
    visibilityFilter: "SHOW_ALL"    //-->来自visibilityFilter
}*/

export default todoApp