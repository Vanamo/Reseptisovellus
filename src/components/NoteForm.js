import React from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { newRecipeNote } from './../reducers/recipeNoteReducer'
import { Redirect } from 'react-router-dom'

class NoteForm extends React.Component {

  state = ({
    note: '',
    newRecipeNote: []
  })

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const recipe = this.props.recipe

    const noteObject = {
      content: this.state.note,
      recipeid: recipe.id
    }

    const newRecipeNote = await this.props.newRecipeNote(noteObject)

    this.setState({
      note: '',
      newRecipeNote
    })
  }

  render() {
    if (this.state.newRecipeNote.length > 0) {
      window.location.reload()
      return null
    }
    return (
      <Grid.Column>
        <Form onSubmit={this.onSubmit}>
          <Form.TextArea
            label='Uusi muistiinpano'
            name='note'
            value={this.state.note}
            onChange={this.handleChange}
          />
          <Form.Button positive>Tallenna muistiinpano</Form.Button>
        </Form>
      </Grid.Column>
    )
  }
}

export default connect(
  null,
  { newRecipeNote }
)(NoteForm)