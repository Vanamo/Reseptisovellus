import ingredientService from './../services/ingredients'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_INGREDIENTS':
    return action.data
  case 'NEW_INGREDIENT':
    return [...state, action.data]
  case 'DELETE_INGREDIENT':
    return state.filter(i => i.id !== action.data.id)
  }
  return state
}

export const initIngredients = () => {
  return async (dispatch) => {
    const ingredients = await ingredientService.getAll()
    dispatch({
      type: 'INIT_INGREDIENTS',
      data: ingredients
    })
  }
}

export const newIngredient = (ingredientObject) => {
  return async (dispatch) => {
    const ingredient = await ingredientService.create(ingredientObject)
    const newIngredient = await ingredientService.getOne(ingredient.id)
    dispatch({
      type: 'NEW_INGREDIENT',
      data: newIngredient
    })
    return newIngredient
  }
}

export const deleteIngredient = (ingredient) => {
  return async (dispatch) => {
    const id = ingredient.id
    await ingredientService.deleteIngredient(id)
    dispatch({
      type: 'DELETE_INGREDIENT',
      data: { id }
    })
  }
}

export default reducer