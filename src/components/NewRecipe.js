import React from 'react'
import { connect } from 'react-redux'
import { newRecipe } from './../reducers/recipeReducer'
import { newSuccessNotification } from './../reducers/notificationReducer'
import { Form, Button } from 'semantic-ui-react'

class NewRecipe extends React.Component {

  state = {
    title: '',
    ingredients: [{ quantity: '', unit: '', name: '' }],
    instructions: '',
    tags: []
  }

  options = [
    { key: 'j', text: 'laktoositon', value: 'laktoositon' },
    { key: 'm', text: 'vegaaninen', value: 'vegaaninen' }
  ]

  handleAddIngredient = () => {
    this.setState({
      ingredients: this.state.ingredients
        .concat([{ quantity: '', unit: '', name: '' }])
    })
  }

  handleRemoveIngredient = (idx) => () => {
    this.setState({
      ingredients: this.state.ingredients.filter((ing, ind) => ind !== idx)
    })
  }

  handleIngredientChange = (idx) => (event) => {
    const newIngredients = this.state.ingredients.map((ingredient, ind) => {
      if (ind !== idx) return ingredient
      return { ...ingredient, [event.target.name]: event.target.value }
    })
    this.setState({ ingredients: newIngredients })
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleTagChange = (event) => {
    console.log('e', event.target.value)

  }

  onSubmit = async (event) => {
    event.preventDefault()
    const recipeObject = {
      title: this.state.title,
      ingredients: this.state.ingredients,
      instructions: this.state.instructions,
      tags: this.state.tags
    }

    await this.props.newRecipe(recipeObject)

    this.props.newSuccessNotification('Uusi resepti luotu', 5)

    this.setState({
      title: '',
      ingredients: [{ quantity: '', unit: '', name: '' }],
      instructions: '',
      tags: []
    })
  }

  render() {
    return (
      <div>
        <h2>Lisää uusi resepti</h2>
        <Form onSubmit={this.onSubmit}>
          <Form.Input
            label='Reseptin nimi'
            name='title'
            value={this.state.title}
            onChange={this.handleFieldChange}
          />
          <strong>Raaka-aineet</strong>
          <p></p>
          {this.state.ingredients.map((ingredient, idx) => (
            <Form.Group widths='equal' key={idx}>
              <Form.Input
                label='määrä'
                name='quantity'
                type='number'
                min='0'
                step='any'
                value={ingredient.quantity}
                onChange={this.handleIngredientChange(idx)}
              />
              <Form.Select
                label='yksikkö'
                name='unit'
                options={this.options}
                placeholder=''
                value={ingredient.unit}
                onChange={this.handleIngredientChange(idx)}
              />
              <Form.Select
                label='raaka-aine'
                name='name'
                options={this.options}
                placeholder=''
                value={ingredient.name}
                onChange={this.handleIngredientChange(idx)}
              />
              <Button
                negative
                onClick={this.handleRemoveIngredient(idx)}>
                Poista
              </Button>
            </Form.Group>
          ))}
          <Button
            type='button'
            onClick={this.handleAddIngredient}>
            Uusi raaka-aine
          </Button>
          <p></p>
          <Form.TextArea
            label='Valmistusohje'
            name='instructions'
            value={this.state.instructions}
            onChange={this.handleFieldChange}
          />
          <Form.Dropdown
            label='Tagit'
            fluid multiple selection options={this.options}
            placeholder=''
            name='tags'
            value={this.state.tags}
            onChange={this.handleTagChange}
          />
          <Form.Button positive>Luo resepti</Form.Button>
        </Form>
      </div>
    )
  }
}

export default connect(
  null,
  { newRecipe, newSuccessNotification }
)(NewRecipe)