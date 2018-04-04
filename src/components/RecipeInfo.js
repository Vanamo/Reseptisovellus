import React from 'react'
import { Button, Card, Container, Grid, Label, Table } from 'semantic-ui-react'
import NoteForm from './NoteForm'
import ChangeNoteForm from './ChangeNoteForm'
import EditRecipe from './EditRecipe'

class RecipeInfo extends React.Component {

  state = {
    showNoteForm: false,
    showChangeNoteForm: false,
    showEditRecipe: false
  }

  showNoteForm = () => {
    this.setState({ showNoteForm: true })
  }

  showChangeNoteForm = () => {
    this.setState({ showChangeNoteForm: true })
  }

  showEditRecipe = () => {
    this.setState({ showEditRecipe: true })
  }

  render() {
    const recipe = this.props.recipe
    if (!recipe) {
      return null
    }

    let note = null
    if (!this.props.note && !this.state.showNoteForm && this.props.user.id) {
      note = (<Grid.Column>
          <Button size='small' onClick={this.showNoteForm}>Lisää muistiinpano</Button>
        </Grid.Column>)
    } else if (this.props.note && !this.state.showChangeNoteForm) {
      note = (
        <Grid.Column>
          <Card>
            <Card.Content>
              <Card.Header>Muistiinpano</Card.Header>
              <Card.Description>
                {this.props.note.content}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button size='mini' onClick={this.showChangeNoteForm}>Muokkaa</Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      )
    }

    let instructions = null
    if (recipe.instructions) {
      instructions = (<div><h2>Valmistusohje</h2><p>{recipe.instructions}</p></div>)
    }

    let tags = null
    if (recipe.tags.length > 0) {
      tags = (<div>{recipe.tags.map(t => <Label color='brown' key={t._id}>{t.name}</Label>)}</div>)
    }

    let edit = null
    if (this.props.user.id === recipe.user._id) {
      edit = (<Button onClick={this.showEditRecipe}>Muokkaa reseptiä</Button>)
    }

    if (this.state.showEditRecipe) {
      return <EditRecipe 
        history={this.props.history} 
        recipe={recipe}
        note={this.props.note}
        user={this.props.user}/>
    }

    return (
      <Grid className='recipe' columns={2}>
        <Grid.Column>
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
          {tags}
          {edit}
        </Grid.Column>
        {note}
        {this.state.showNoteForm && <NoteForm recipe={recipe} />}
        {this.state.showChangeNoteForm && <ChangeNoteForm note={this.props.note} />}
      </Grid>
    )
  }
}

export default RecipeInfo