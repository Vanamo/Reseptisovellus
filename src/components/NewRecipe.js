import React from 'react'
import { connect } from 'react-redux'
import { newRecipe } from './../reducers/recipeReducer'
import { Form, Button } from 'semantic-ui-react'

class NewRecipe extends React.Component {

  state = {}

  options = [
    { key: 'j', text: 'laktoositon', value: 'laktoositon' },
    { key: 'm', text: 'vegaaninen', value: 'vegaaninen' }
  ]

  onSubmit = (event) => {
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <h2>Lisää uusi resepti</h2>
        <Form onSubmit={this.onSubmit}>
          <Form.Input label='Reseptin nimi' />
          <Form.Select
            label='Raaka-aineet'
            options={this.options} placeholder=''
          />
          <Form.TextArea label='Valmistusohje' />
          <Form.Dropdown
            label='Tagit'
            fluid multiple selection options={this.options} placeholder=''
          />
          <Form.Button>Luo resepti</Form.Button>
        </Form>
      </div>
    )
  }
}

export default connect(
  null,
  { newRecipe }
)(NewRecipe)