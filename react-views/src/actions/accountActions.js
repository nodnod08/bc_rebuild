export const login = (userCredentials) => dispatch => {
    dispatch({
        type: 'LOGIN',
        payload: userCredentials
    })
}

