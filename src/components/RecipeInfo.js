import React from 'react'
import { Container, Table, Label } from 'semantic-ui-react'
import NoteForm from './NoteForm'

class RecipeInfo extends React.Component {

  state = {
    showNoteForm: false
  }

  showNoteForm = () => {
    this.setState({ showNoteForm: true })
  }

  render() {
    const recipe = this.props.recipe
    console.log('recipe', recipe)
    if (!recipe) {
      return null
    }

    let note = null
    if (!recipe.note && !this.state.showNoteForm) {
      note = <a onClick={this.showNoteForm}>Lisää muistiinpano</a>
    } else if (recipe.note) {
      note = (<div><h3>Muistiinpano</h3><p>{recipe.note}</p></div>)
    }

    let instructions = null
    if (recipe.instructions) {
      instructions = (<div><h2>Valmistusohje</h2><p>{recipe.instructions}</p></div>)
    }

    let tags = null
    if (recipe.tags.length > 0) {
      tags = (<div><h3>Tagit</h3>{recipe.tags.map(t => <Label key={t._id}>{t.name}</Label>)}</div>)
    }

    return (
      <Container>
        <h1>{recipe.title}</h1>
        <h2>Raaka-aineet</h2>
        <Table compact basic='very' celled collapsing id='ingredients'>
          <Table.Body>
            {recipe.ingredients.map(i =>
              <Table.Row key={i.id}>
                <Table.Cell>
                  {i.quantity}
                </Table.Cell>
                <Table.Cell>
                  {i.unit.name}
                </Table.Cell>
                <Table.Cell>
                  {i.name.name}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <p></p>
        {instructions}
        <p></p>
        {tags}
        <p></p>
        {note}
        {this.state.showNoteForm && <NoteForm/>}
      </Container>
    )
  }
}

export default RecipeInfo