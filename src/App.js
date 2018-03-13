import React from 'react'
import { connect } from 'react-redux'
import recipeService from './services/recipes'
import { initRecipes } from './reducers/recipeReducer'

class App extends React.Component {

  state = {
    username: '',
    password: ''
  }

  componentDidMount() {
    this.props.initRecipes()

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.setUser({ user })
      recipeService.setToken(user.token)
    }
  }

  render() {
    return (
      <div>
        <h1>Reseptisovellus</h1>
        {this.props.recipes.map(r => r.title)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes
  }
}

export default connect(
  mapStateToProps,
  {
    initRecipes
  }
)(App)
