import React from 'react'
import { connect } from 'react-redux'
import recipeService from './services/recipes'
import recipeNoteService from './services/recipeNotes'
import likeService from './services/likes'
import recipeEmphasisService from './services/recipeEmphases'
import { initRecipes } from './reducers/recipeReducer'
import Login from './components/Login'
import Notification from './components/Notification'
import { setUser, loginUser, logoutUser } from './reducers/userReducer'
import { Container } from 'semantic-ui-react'
import NavigationMenu from './components/NavigationMenu'
import { HashRouter as Router, Route } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import NewRecipe from './components/NewRecipe'
import { initIngredientUnits } from './reducers/ingredientUnitReducer'
import { initIngredientNames } from './reducers/ingredientNameReducer'
import { initTags } from './reducers/tagReducer'
import { initRecipeNotes } from './reducers/recipeNoteReducer'
import { initLikes } from './reducers/likeReducer'
import { initUsers } from './reducers/allUsersReducer'
import { initRecipeEmphases } from './reducers/recipeEmphasisReducer'
import RecipeInfo from './components/RecipeInfo'
import Favorites from './components/Favorites'

class App extends React.Component {

  componentDidMount() {
    this.props.initRecipes()
    this.props.initIngredientUnits()
    this.props.initTags()
    this.props.initIngredientNames()
    this.props.initRecipeNotes()
    this.props.initLikes()
    this.props.initUsers()
    this.props.initRecipeEmphases()

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.setUser({ user })
      recipeService.setToken(user.token)
      recipeNoteService.setToken(user.token)
      likeService.setToken(user.token)
      recipeEmphasisService.setToken(user.token)
    }
  }

  handleLogout = () => {
    window.localStorage.clear()
    this.props.logoutUser()
  }

  render() {

    const recipeById = (id) => {
      console.log('recipes', this.props.recipes)
      const recipe = this.props.recipes.find(r => r.id === String(id))
      return recipe
    }

    const noteById = (recipeid) => {
      const note = this.props.recipeNotes
        .find(rn => rn.recipeid === String(recipeid) && rn.userid === String(this.props.user.id))
      return note
    }

    const likesById = (recipeid) => {
      const likes = this.props.likes.filter(l => String(l.recipeid) === String(recipeid))
      return likes
    }

    const emphasisById = (recipeid) => {
      if (!this.props.recipeEmphases) {
        return null
      }
      let emphasis = this.props.recipeEmphases.find(e => String(e.recipeid) === String(recipeid))
      if (!emphasis) {
        emphasis = { content: 'no' }
      }
      return emphasis
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
              <RecipeList
                recipes={this.props.recipes}
                likes={this.props.likes}
                user={this.props.user}
              />
            } />
            <Route exact path='/recipes/:id' render={({ match }) =>
              <RecipeInfo
                recipe={recipeById(match.params.id)}
                note={noteById(match.params.id)}
                likes={likesById(match.params.id)}
                emphasis={emphasisById(match.params.id)}
                user={this.props.user}
              />}
            />
            <Route exact path='/login' render={({ history }) =>
              <Login history={history} />
            } />
            <Route exact path='/newRecipe' render={() =>
              <NewRecipe />
            } />
            <Route exact path='/favorites' render={() =>
              <Favorites
                user={this.props.user}
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
    allUsers: state.allUsers,
    recipes: state.recipes,
    ingredientUnits: state.ingredientUnits,
    ingredientNames: state.ingredientNames,
    tags: state.tags,
    recipeNotes: state.recipeNotes,
    likes: state.likes,
    recipeEmphases: state.recipeEmphases
  }
}

export default connect(
  mapStateToProps,
  {
    initRecipes, setUser, loginUser, logoutUser,
    initIngredientUnits,
    initIngredientNames, initTags, initRecipeNotes,
    initLikes, initUsers, initRecipeEmphases
  }
)(App)
