import React from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { newRecipeNote } from './../reducers/recipeNoteReducer'

class NoteForm extends React.Component {

  state = ({
    note: ''
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

    await this.props.newRecipeNote(noteObject)

    this.setState({
      note: ''
    })

  }

  render() {
    return(
      <Form onSubmit={this.onSubmit}>
        <Form.TextArea
          label='Uusi muistiinpano'
          name='note'
          value={this.state.note}
          onChange={this.handleChange}
        />
        <Form.Button positive>Lisää muistiinpano</Form.Button>
      </Form>
    )
  }
}

export default connect(
  null,
  { newRecipeNote }
)(NoteForm)