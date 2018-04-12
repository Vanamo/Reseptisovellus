import ingredientUnitService from './../services/ingredientUnits'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_INGREDIENTUNITS':
    return action.data
  case 'NEW_INGREDIENTUNIT':
    return [...state, action.data]
  }
  return state
}

export const initIngredientUnits = () => {
  return async (dispatch) => {
    const ingredientUnits = await ingredientUnitService.getAll()
    dispatch({
      type: 'INIT_INGREDIENTUNITS',
      data: ingredientUnits
    })
  }
}

export const newIngredientUnit = (ingredientUnitObject) => {
  return async (dispatch) => {
    const ingredientUnit = await ingredientUnitService.create(ingredientUnitObject)
    const newIngredientUnit = await ingredientUnitService.getOne(ingredientUnit.id)
    dispatch({
      type: 'NEW_INGREDIENTUNIT',
      data: newIngredientUnit
    })
  }
}

export default reducer