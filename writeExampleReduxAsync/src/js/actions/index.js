const saveReducer = (data) => {
    return {
        type: 'SAVE_REDUCER',
        data
    }
}

export const getTest = (id) => (dispatch, getState) => {
    fetch(`https://cnodejs.org/api/v1/topic/${id}`)
        .then(response => response.json())
        .then(json => {
            dispatch(saveReducer(json))
        })

}
