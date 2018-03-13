import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import recipeReducer from './reducers/recipeReducer'

const reducer = combineReducers({
  recipes: recipeReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store