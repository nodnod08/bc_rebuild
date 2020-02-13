const jwt = require('jsonwebtoken')

export const login = (userCredentials) => dispatch => {
    dispatch({
        type: 'LOGIN',
        payload: userCredentials
    })
}

export const reload = () => dispatch => {
    const local = localStorage.getItem('authenticatedSE')
    let payloads = ''
    var decodedToken=jwt.decode(local, {complete: true});
    console.log(decodedToken)
    payloads = (local == null) ? null : JSON.parse(local)
    dispatch({
        type: 'RELOAD',
        payload: payloads
    })
}

export const logout = () => dispatch => {
    localStorage.removeItem('authenticatedSE')
    dispatch({
        type: 'LOGOUT'
    })
}

