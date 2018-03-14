import React from 'react'
import { Table } from 'semantic-ui-react'

class RecipeList extends React.Component {
  render() {
    const recipes = this.props.recipes
    return (
      <div>
        {/* <Table striped celled>
          <Table.body>
            {recipes.map(r =>
              <Table.Row key={r.id}>
                <Table.Cell>
                  {r.title}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.body>
        </Table> */}
        {recipes.map(r => r.title)}
      </div>
    )
  }
}

export default RecipeList