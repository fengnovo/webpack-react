import * as types from '../../constants'

const initalState = {
    users: [],
    usersById: []
}

const user = (state =  initalState, action) => {
    switch (type.SET_USER){
        case types.SET_USER:
            return {
                ...state,
                users: action.data.users,
                usersById: action.data.userById
            }
        default:
            return state
    }
}

export default user