import tagService from './../services/tag'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_TAGS':
    return action.data
  case 'NEW_TAG':
    return [...state, action.data]
  }
  return state
}

export const initTags = () => {
  return async (dispatch) => {
    const tags = await tagService.getAll()
    dispatch({
      type: 'INIT_TAGS',
      data: tags
    })
  }
}

export const newTag = (tagObject) => {
  return async (dispatch) => {
    const tag = await tagService.create(tagObject)
    const newTag = await tagService.getOne(tag.id)
    dispatch({
      type: 'NEW_TAG',
      data: newTag
    })
    return newTag
  }
}

export default reducer