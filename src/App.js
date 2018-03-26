import React from 'react'
import { connect } from 'react-redux'
import recipeService from './services/recipes'
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
import RecipeInfo from './components/RecipeInfo'

class App extends React.Component {

  componentDidMount() {
    this.props.initRecipes()
    this.props.initIngredientUnits()
    this.props.initTags()
    this.props.initIngredientNames()

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.setUser({ user })
      recipeService.setToken(user.token)
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
              <RecipeInfo recipe={recipeById(match.params.id)} />}
            />
            <Route exact path='/login' render={({history}) =>
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    recipes: state.recipes,
    ingredientUnits: state.ingredientUnits,
    ingredientNames: state.ingredientNames,
    tags: state.tags
  }
}

export default connect(
  mapStateToProps,
  {
    initRecipes, setUser, loginUser, logoutUser,
    initIngredientUnits,
    initIngredientNames, initTags
  }
)(App)
