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
    if (!recipe) {
      return null
    }

    let note = null
    if (!this.props.note && !this.state.showNoteForm && this.props.user.id) {
      note = <a onClick={this.showNoteForm} style={{ cursor: 'pointer' }}>Lisää muistiinpano</a>
    } else if (this.props.note) {
      note = (<div><h3>Muistiinpano</h3><p>{this.props.note.content}</p></div>)
    }

    let instructions = null
    if (recipe.instructions) {
      instructions = (<div><h2>Valmistusohje</h2><p>{recipe.instructions}</p></div>)
    }

    let tags = null
    if (recipe.tags.length > 0) {
      tags = (<div>{recipe.tags.map(t => <Label key={t._id}>{t.name}</Label>)}</div>)
    }

    return (
      <Container className='recipe'>
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
        {instructions}
        {note}
        {this.state.showNoteForm && <NoteForm recipe={recipe} />}
        {tags}
      </Container>
    )
  }
}

export default RecipeInfo