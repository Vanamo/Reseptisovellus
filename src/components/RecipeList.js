import React from 'react'
import { Icon, Input, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class RecipeList extends React.Component {

  state = {
    recipes: this.props.recipes
  }

  likes = (recipe) => {
    if (recipe.likedUsers) {
      return recipe.likedUsers.length
    } else {
      return 0
    }
  }

  handleSearchChange = (e) => {
    const searchString = e.target.value.toLowerCase()
    console.log('ss', searchString)
    const filteredRecipes = this.props.recipes.filter(r => r.title.toLowerCase().search(searchString) !== -1)
    this.setState({
      recipes: filteredRecipes
    })
  }

  render() {
    if (!this.props.recipes.length) {
      return null
    }

    const sortByLikes = (a, b) => {
      const likea = this.likes(a)
      const likeb = this.likes(b)
      if (likea < likeb) return 1
      if (likea > likeb) return -1
      return 0
    }

    console.log('r', this.state.recipes)
    const recipes = this.state.recipes.sort(sortByLikes)


    const user = this.props.user
    const heartStyle = (recipe) => {
      let like = null
      if (recipe.likedUsers) {
        like = recipe.likedUsers.find(l => l === user.id)
      }
      if (like || user.id === recipe.user._id) {
        return <Icon name='heart' color='red' />
      } else {
        return  <Icon name='empty heart' color='red' />
      }
    }

    return (
      <div>
        <h2>Reseptit</h2>

        <Input icon='search' 
          placeholder='Hae reseptin nimellä...'
          onChange={this.handleSearchChange}  
        />

        <Table basic='very'>
          <Table.Body>
            {recipes.map(r =>
              <Table.Row key={r.id}>
                <Table.Cell collapsing>
                  {heartStyle(r)}{this.likes(r)}
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/recipes/${r.id}`}>{r.title}</Link>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default RecipeList