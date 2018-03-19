import React from 'react'
import { Table } from 'semantic-ui-react'

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
        <Table striped celled>
          <Table.Body>
            {recipes.map(r =>
              <Table.Row key={r.id}>
                <Table.Cell>
                  {r.title}
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