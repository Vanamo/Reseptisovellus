import React from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateRecipeNote } from './../reducers/recipeNoteReducer'

class ChangeNoteForm extends React.Component {

  state = ({
    note: `${this.props.note.content}`
  })

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const note = this.props.note
    const changedNote = {
      ...note,
      content: this.state.note,
    }
    console.log('cn', changedNote)
    await this.props.updateRecipeNote(changedNote)

    this.setState({
      note: ''
    })

  }

  render() {
    return (
      <Grid.Column>
        <Form onSubmit={this.onSubmit}>
          <Form.TextArea
            onChange={this.handleChange}
            label='Muokkaa muistiinpanoa'
            name='note'
            value={this.state.note}
          />
          <Form.Button positive>Tallenna muistiinpano</Form.Button>
        </Form>
      </Grid.Column>
    )
  }
}

export default connect(
  null,
  { updateRecipeNote }
)(ChangeNoteForm)