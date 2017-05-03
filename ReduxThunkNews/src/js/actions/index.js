const FetchReducer = (data) => {
    return {
        type: 'FETCH',
        data
    }
}

export const GETDATA = (id) => (dispatch, getState) => {
    fetch(`https://cnodejs.org/api/v1/topics`)
        .then(response => response.json())
        .then(json => {
            dispatch(FetchReducer(json))
        })
}
