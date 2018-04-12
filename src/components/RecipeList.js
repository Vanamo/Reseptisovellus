import React from 'react'
import { Icon, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class RecipeList extends React.Component {
  render() {
    const recipes = this.props.recipes
    if (!recipes) {
      return null
    }

    const findLikes = (id) => {
      return this.props.likes.filter(l => l.recipeid === id).length
    }

    const user = this.props.user
    const heartStyle = (recipe) => {
      const like = this.props.likes.find(l => l.recipeid === recipe.id && l.userid === user.id)
      if (like || user.id === recipe.user._id) {
        return <Icon name='heart' color='red' />
      } else {
        return  <Icon name='empty heart' color='red' />
      }
    }

    return (
      <div>
        <h2>Reseptit</h2>
        <Table basic='very'>
          <Table.Body>
            {recipes.map(r =>
              <Table.Row key={r.id}>
                <Table.Cell width={6}>
                  <Link to={`/recipes/${r.id}`}>{r.title}</Link>
                </Table.Cell>
                <Table.Cell>
                  {heartStyle(r)}{findLikes(r.id)}
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