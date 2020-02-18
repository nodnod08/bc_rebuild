const initialState = {
  isLoggedIn: false,
  user: null,
  token: ''
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
          token: ''
        })
      case 'RELOAD':
          if(action.payload == null) {
            return ({
              ...state,
              user: null,
              isLoggedIn: false,
              token: ''
            })   
          }
          return ({
            ...state,
            user: action.payload.user,
            isLoggedIn: true,
            token: action.payload.token
          })
      default:
        return ({
          ...state
        })
    }
}
