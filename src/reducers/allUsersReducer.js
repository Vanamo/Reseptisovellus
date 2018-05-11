import userService from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  case 'UPDATE_USER': {
    const changedUser = action.data.changedUser
    const id = changedUser.id
    return state.map(u => u.id !== id ? u : changedUser)
  }
  }
  return state
}

export const initUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const updateUser = (changedUser) => {
  return async (dispatch) => {
    await userService.update(changedUser.id, changedUser)
    dispatch({
      type: 'UPDATE_USER',
      data: { changedUser }
    })
  }
}

export default reducer