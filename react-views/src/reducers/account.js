const initialState = {
  isLoggedIn: false,
  user: {},
  token: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN':
        return({
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          isLoggedIn: true
        })
      case 'LOGOUT':
        return ({
          ...state,
          user: {},
          isLoggedIn: false,
          data: {}
        })
      default:
        return ({
          ...state
        })
    }
}
