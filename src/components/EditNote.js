import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateRecipeNote } from './../reducers/recipeNoteReducer'

class EditNote extends React.Component {

  state = ({
    note: `${this.props.note.content}`,
    cancel: false
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
    await this.props.updateRecipeNote(changedNote)

    this.setState({
      note: ''
    })

    window.location.reload()
  }

  onCancel = () => {
    this.setState({ cancel: true })
  }

  render() {
    if (this.state.cancel) {
      window.location.reload()
      return null
    }
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <Form.TextArea
            onChange={this.handleChange}
            label='Muokkaa muistiinpanoa'
            name='note'
            value={this.state.note}
          />
        </Form>
        <p></p>
        <Button positive onClick={this.onSubmit}>Tallenna muutokset</Button>
        <Button negative onClick={this.onCancel}>Peruuta</Button>
      </div>
    )
  }
}

export default connect(
  null,
  { updateRecipeNote }
)(EditNote)