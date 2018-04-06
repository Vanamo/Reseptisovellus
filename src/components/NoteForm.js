import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { newRecipeNote } from './../reducers/recipeNoteReducer'

class NoteForm extends React.Component {

  state = ({
    note: '',
    newRecipeNote: [],
    cancel: false
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

  onCancel = () => {
    this.setState({ cancel: true })
  }

  render() {
    if (this.state.newRecipeNote.length > 0 || this.state.cancel) {
      window.location.reload()
      return null
    }
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <Form.TextArea
            label='Uusi muistiinpano'
            name='note'
            value={this.state.note}
            onChange={this.handleChange}
          />
        </Form>
        <p></p>
        <Button positive onClick={this.onSubmit}>Tallenna muistiinpano</Button>
        <Button negative onClick={this.onCancel}>Peruuta</Button>
      </div>
    )
  }
}

export default connect(
  null,
  { newRecipeNote }
)(NoteForm)