import axios from 'axios'

export const login = (userCredentials) => dispatch => {
    dispatch({
        type: 'LOGIN',
        payload: userCredentials
    })
}

export const reload = () => dispatch => {
    const local = localStorage.getItem('authenticatedSE')
    let payloads = null
    payloads = (local == null) ? null : local
    if(payloads == null) {
        dispatch({
            type: 'RELOAD',
            payload: payloads
        })
    } else {
        axios.post('/user/checkJWT', {
            payloads
        }).then(response => {
            console.log(response.data.result)
            dispatch({
                type: 'RELOAD',
                payload: (response.data.result.message == 'jwt not expired' && response.data.result.validUser ) ? JSON.parse(payloads) : null
            })
        })
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('authenticatedSE')
    dispatch({
        type: 'LOGOUT'
    })
}

