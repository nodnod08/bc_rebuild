const initialState = {
  isLoggedIn: false,
  user: {}
}

export default function counter(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN':
        // return state + 1
      case 'LOGOUT':
        // return state - 1
      default:
        // return state
    }
  }