const visibilityFilter = (state = 'SHOW_ALL',action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter        //把action的state给新的state
        default:
            return state
    }
}

export default visibilityFilter