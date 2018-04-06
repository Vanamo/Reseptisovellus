import likeService from './../services/likes'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_LIKES':
    return action.data
  case 'NEW_LIKE':
    return [...state, action.data]
  case 'DELETE_LIKE':
    return state.filter(l => l.id !== action.data.id)
  }
  return state
}

export const newLike = (likeObject) => {
  return async (dispatch) => {
    const like = await likeService.create(likeObject)
    const newLike = await likeService.getOne(like.recipeid, like.userid)
    dispatch({
      type: 'NEW_LIKE',
      data: newLike
    })
  }
}

export const initLikes = () => {
  return async (dispatch) => {
    const likes = await likeService.getAll()
    dispatch({
      type: 'INIT_LIKES',
      data: likes
    })
  }
}

export const deleteLike = (like) => {
  return async (dispatch) => {
    const id = like._id
    await likeService.deleteLike(like.recipeid, like.userid)
    dispatch({
      type: 'DELETE_LIKE',
      data: { id }
    })
  }
}

export default reducer