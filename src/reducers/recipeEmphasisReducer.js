import recipeEmphasesService from './../services/recipeEmphases'

const reducer = (state = null, action) => {
  switch(action.type) {
  case 'INIT_RECIPEEMPHASES':
    return action.data
  case 'NEW_RECIPEEMPHASIS':
    return [...state, action.data]
  case 'UPDATE_RECIPEEMPHASIS': {
    const changedRecipeEmphasis = action.data
    const id = changedRecipeEmphasis.id
    return state.map(e => e.id !== id ? e : changedRecipeEmphasis)
  }
  case 'DELETE_RECIPEEMPHASIS':
    return state.filter(e => e.id !== action.data.id)
  }
  return state
}

export const newRecipeEmphasis = (emphasisObject) => {
  return async (dispatch) => {
    const emphasis = await recipeEmphasesService.create(emphasisObject)
    const newEmphasis = await recipeEmphasesService.getOne(emphasis.recipeid, emphasis.userid)
    dispatch({
      type: 'NEW_RECIPEEMPHASIS',
      data: newEmphasis
    })
  }
}

export const initRecipeEmphases = () => {
  return async (dispatch) => {
    const recipeEmphases = await recipeEmphasesService.getAll()
    console.log('re', recipeEmphases)
    dispatch({
      type: 'INIT_RECIPEEMPHASES',
      data: recipeEmphases
    })
  }
}

export const updateRecipeEmphasis = (changedEmphasis) => {
  return async (dispatch) => {
    const recipeid = changedEmphasis.recipeid
    const userid = changedEmphasis.userid
    await recipeEmphasesService.update(recipeid, userid, changedEmphasis)
    dispatch({
      type: 'UPDATE_RECIPEEMPHASIS',
      data: { changedEmphasis }
    })
  }
}

export const deleteRecipeEmphasis = (emphasis) => {
  return async (dispatch) => {
    const id = emphasis._id
    await recipeEmphasesService.deleteRecipeEmphasis(emphasis.recipeid, emphasis.userid)
    dispatch({
      type: 'DELETE_RECIPEEMPHASIS',
      data: { id }
    })
  }
}

export default reducer