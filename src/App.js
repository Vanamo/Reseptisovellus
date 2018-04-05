import React from 'react'
import { connect } from 'react-redux'
import recipeService from './services/recipes'
import recipeNoteService from './services/recipeNotes'
import likeService from './services/likes'
import { initRecipes } from './reducers/recipeReducer'
import Login from './components/Login'
import Notification from './components/Notification'
import { setUser, loginUser, logoutUser } from './reducers/userReducer'
import { Container } from 'semantic-ui-react'
import NavigationMenu from './components/NavigationMenu'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import NewRecipe from './components/NewRecipe'
import { initIngredientUnits } from './reducers/ingredientUnitReducer'
import { initIngredientNames } from './reducers/ingredientNameReducer'
import { initTags } from './reducers/tagReducer'
import { initRecipeNotes } from './reducers/recipeNoteReducer'
import { initLikes } from './reducers/likeReducer'
import RecipeInfo from './components/RecipeInfo'

class App extends React.Component {

  componentDidMount() {
    this.props.initRecipes()
    this.props.initIngredientUnits()
    this.props.initTags()
    this.props.initIngredientNames()
    this.props.initRecipeNotes()
    this.props.initLikes()

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.setUser({ user })
      recipeService.setToken(user.token)
      recipeNoteService.setToken(user.token)
      likeService.setToken(user.token)
    }
  }

  handleLogout = () => {
    window.localStorage.clear()
    this.props.logoutUser()
  }

  render() {

    const recipeById = (id) => {
      const recipe = this.props.recipes.find(r => r.id === String(id))
      return recipe
    }

    const noteById = (recipeid) => {
      const note = this.props.recipeNotes
        .find(rn => rn.recipeid === String(recipeid) && rn.userid === String(this.props.user.id))
      return note
    }

    const likesById = (recipeid) => {
      console.log('l', this.props.likes)
      return this.props.likes.filter(id => String(id) === String(recipeid))
    }

    return (
      <Container>
        <Router>
          <div>
            <NavigationMenu
              user={this.props.user}
              handleLogout={this.handleLogout}
            />
            <Notification />

            <Route exact path='/' render={() =>
              <RecipeList recipes={this.props.recipes} />
            } />
            <Route exact path='/recipes/:id' render={({ match }) =>
              <RecipeInfo
                recipe={recipeById(match.params.id)}
                note={noteById(match.params.id)}
                likes={likesById(match.params.id)}
                user={this.props.user}
              />}
            />
            <Route exact path='/login' render={({ history }) =>
              <Login history={history} />
            } />
            <Route exact path='/newRecipe' render={() =>
              <NewRecipe
                ingredients={this.props.ingredientNames}
                units={this.props.ingredientUnits}
                tags={this.props.tags}
              />
            } />
          </div>
        </Router>
      </Container>
    )
  }
}

const sortAlphabetically = (a, b) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    recipes: state.recipes,
    ingredientUnits: state.ingredientUnits.sort(sortAlphabetically),
    ingredientNames: state.ingredientNames.sort(sortAlphabetically),
    tags: state.tags.sort(sortAlphabetically),
    recipeNotes: state.recipeNotes,
    likes: state.likes
  }
}

export default connect(
  mapStateToProps,
  {
    initRecipes, setUser, loginUser, logoutUser,
    initIngredientUnits,
    initIngredientNames, initTags, initRecipeNotes,
    initLikes
  }
)(App)
