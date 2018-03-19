import React from 'react'
import { Container, Table, Label } from 'semantic-ui-react'

class RecipeInfo extends React.Component {

  render() {
    const recipe = this.props.recipe
    console.log('recipe', recipe)
    if (!recipe) {
      return null
    }
    return (
      <Container>
        <h1>{recipe.title}</h1>
        <h2>Raaka-aineet</h2>
        <Table>
          <Table.Body>
            {recipe.ingredients.map(i =>
              <Table.Row key={i.id}>
                <Table.Cell>
                  {console.log('i', i)}
                  {i.name}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <p></p>
        <h2>Valmistusohje</h2>
        <p>{recipe.instructions}</p>
        <p></p>
        <h3>Tagit</h3>
        {recipe.tags.map(t => <Label key={t.id}>{t.name}</Label>)}
      </Container>
    )
  }
}

export default RecipeInfo