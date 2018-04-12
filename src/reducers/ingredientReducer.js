import ingredientService from './../services/ingredients'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_INGREDIENTS':
    return action.data
  case 'NEW_INGREDIENT':
    return [...state, action.data]
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
  console.log('io', ingredientObject)
  return async (dispatch) => {
    const ingredient = await ingredientService.create(ingredientObject)
    const newIngredient = await ingredientService.getOne(ingredient.id)
    console.log('newIngredient', newIngredient)
    dispatch({
      type: 'NEW_INGREDIENT',
      data: newIngredient
    })
    return newIngredient
  }
}

export default reducer