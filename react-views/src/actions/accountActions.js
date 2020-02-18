import axios from 'axios'

export const login = (userCredentials) => dispatch => {
    dispatch({
        type: 'LOGIN',
        payload: userCredentials
    })
}

export const reload = () => dispatch => {
    const payloads = localStorage.getItem('authenticatedSE')

    if(payloads == null || payloads == '') {
        console.log('dto yan')
        dispatch({
            type: 'RELOAD',
            payload: null
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

