import React from 'react'
import { Form } from 'semantic-ui-react'

class NoteForm extends React.Component {

  state = ({
    note: ''
  })

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = () => {
    
  }

  render() {
    return(
      <Form onSubmit={this.onSubmit}>
        <Form.Input
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

export default NoteForm