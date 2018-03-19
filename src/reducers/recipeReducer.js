import recipeService from './../services/recipes'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_RECIPES':
    return action.data
  case 'NEW_RECIPE':
    return [...state, action.data]
  }
  return state
}

export const initRecipes = () => {
  return async (dispatch) => {
    const recipes = await recipeService.getAll()
    dispatch({
      type: 'INIT_RECIPES',
      data: recipes
    })
  }
}

export const newRecipe = (recipeObject) => {
  return async (dispatch) => {
    const recipe = await recipeService.create(recipeObject)
    const newRecipe = await recipeService.getOne(recipe.id)
    dispatch({
      type: 'NEW_RECIPE',
      data: newRecipe
    })
  }
}

export default reducer