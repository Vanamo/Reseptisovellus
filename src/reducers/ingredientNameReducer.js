import ingredientNameService from './../services/ingredientNames'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_INGREDIENTNAMES':
    return action.data
  case 'NEW_INGREDIENTNAME':
    return [...state, action.data]
  }
  return state
}

export const initIngredientNames = () => {
  return async (dispatch) => {
    const ingredientNames = await ingredientNameService.getAll()
    dispatch({
      type: 'INIT_INGREDIENTNAMES',
      data: ingredientNames
    })
  }
}

export const newIngredientName = (ingredientNameObject) => {
  return async (dispatch) => {
    const ingredientName = await ingredientNameService.create(ingredientNameObject)
    const newIngredientName = await ingredientNameService.getOne(ingredientName.id)
    dispatch({
      type: 'NEW_INGREDIENTNAME',
      data: newIngredientName
    })
  }
}

export default reducer