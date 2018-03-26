import React from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class RecipeList extends React.Component {
  render() {
    const recipes = this.props.recipes
    if (!recipes) {
      return null
    }
    console.log('r', recipes)
    return (
      <div>
        <h2>Reseptit</h2>
        <Table basic='very'>
          <Table.Body>
            {recipes.map(r =>
              <Table.Row key={r.id}>
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