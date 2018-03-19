import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import recipeReducer from './reducers/recipeReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import ingredientReducer from './reducers/ingredientReducer'
import ingredientUnitReducer from './reducers/ingredientUnitReducer'
import tagReducer from './reducers/tagReducer'

const reducer = combineReducers({
  recipes: recipeReducer,
  user: userReducer,
  notification: notificationReducer,
  ingredients: ingredientReducer,
  ingredientUnits: ingredientUnitReducer,
  tags: tagReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store