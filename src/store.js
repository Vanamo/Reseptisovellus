import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import recipeReducer from './reducers/recipeReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import ingredientUnitReducer from './reducers/ingredientUnitReducer'
import ingredientNameReducer from './reducers/ingredientNameReducer'
import tagReducer from './reducers/tagReducer'
import recipeNoteReducer from './reducers/recipeNoteReducer'

const reducer = combineReducers({
  recipes: recipeReducer,
  user: userReducer,
  notification: notificationReducer,
  ingredientUnits: ingredientUnitReducer,
  ingredientNames: ingredientNameReducer,
  tags: tagReducer,
  recipeNotes: recipeNoteReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store