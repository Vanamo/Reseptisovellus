import React from 'react'
import { Form, Icon, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class RecipeList extends React.Component {

  state = {
    recipes: null,
    search: '',
    tags: []
  }

  populateOptions = (options) => {
    return options.map(option => ({ key: option.id, text: option.name, value: option.id }))
  }

  handleTagChange = (event, data) => {
    const tags = data.value
    const newTag = String(tags[tags.length - 1])
    if (!this.props.tags.find(t => t.id === newTag)) {
      tags.pop()
    }
    this.setState({ tags })

    let filteredRecipes = this.props.recipes
    for (let i = 0, len = tags.length; i < len; i++) {
      filteredRecipes = filteredRecipes.filter(r => r.tags.find(t => String(t._id) === String(tags[i])))
    }
    this.setState({ recipes: filteredRecipes })
  }

  likes = (recipe) => {
    if (recipe.likedUsers) {
      return recipe.likedUsers.length
    } else {
      return 0
    }
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value })
    const searchString = e.target.value.toLowerCase()
    const filteredRecipes = this.props.recipes.filter(r => r.title.toLowerCase().search(searchString) !== -1)
    this.setState({
      recipes: filteredRecipes
    })
  }

  handleLeaving = (e) => {
    this.setState({ search: '', tags: [] })
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

    let recipes = null
    if (!this.state.recipes) {
      recipes = this.props.recipes.sort(sortByLikes)
    } else {
      recipes = this.state.recipes.sort(sortByLikes)
    }

    const user = this.props.user
    const heartStyle = (recipe) => {
      let like = null
      if (recipe.likedUsers) {
        like = recipe.likedUsers.find(l => l === user.id)
      }
      if (like || user.id === recipe.user._id) {
        return <Icon name='heart' color='red' />
      } else {
        return <Icon name='empty heart' color='red' />
      }
    }

    return (
      <div>
        <h2>Reseptit</h2>

        <Form>
          <Form.Group inline>
          <Form.Input icon='search'
            placeholder='Hae reseptin nimellä...'
            value={this.state.search}
            onChange={this.handleSearchChange}
            onBlur={this.handleLeaving}
          />
          <Form.Dropdown inline
            icon='search'
            multiple
            selection
            options={this.populateOptions(this.props.tags)}
            search
            placeholder='Hae tageilla...'
            name='tags'
            value={this.state.tags}
            onChange={this.handleTagChange}
            onBlur={this.handleLeaving}
          />
          </Form.Group>
        </Form>

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

const sortAlphabetically = (a, b) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}

const mapStateToProps = (state) => {
  return {
    tags: state.tags.sort(sortAlphabetically)
  }
}

export default connect(
  mapStateToProps
)(RecipeList)