import loginService from '../services/login'
import recipeService from '../services/recipes'

const initialState = {
  id: null,
  username: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  case 'LOGIN_USER':
    return action.user
  }
  return state
}

export const setUser = (userData) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_USER',
      user: userData.user
    })
  }
}

export const loginUser = (userData) => {
  const username = userData.username
  const password = userData.password
  console.log('user', username, password)
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      recipeService.setToken(loggedUser.token)
      dispatch({
        type: 'LOGIN_USER',
        user: loggedUser
      })
    } catch (exception) {
      dispatch({
        type: 'ERROR',
        message: 'wrong username or password',
        style: 'error'
      })
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' })
      }, 5000)
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: 'SET_USER',
      user: initialState
    })
  }
}

export default reducer