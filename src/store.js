import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import recipeReducer from './reducers/recipeReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  recipes: recipeReducer,
  user: userReducer,
  notification: notificationReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store