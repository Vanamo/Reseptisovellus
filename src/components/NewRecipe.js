import React from 'react'
import { connect } from 'react-redux'
import { newRecipe } from './../reducers/recipeReducer'
import { newIngredient } from './../reducers/ingredientReducer'
import { newSuccessNotification, newErrorNotification } from './../reducers/notificationReducer'
import { Form, Button, Select } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

class NewRecipe extends React.Component {

  state = {
    title: '',
    ingredients: [{ quantity: '', unit: '', name: '' }],
    instructions: '',
    tags: [],
    newRecipe: {}
  }

  populateOptions = (options) => {
    return options.map(option => ({ key: option.id, text: option.name, value: option.id }))
  }

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

  handleIngredientChange = (idx) => (event, data) => {
    const newIngredients = this.state.ingredients.map((ingredient, ind) => {
      if (ind !== idx) return ingredient
      return { ...ingredient, [data.name]: data.value }
    })
    this.setState({ ingredients: newIngredients })
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleTagChange = (event, data) => {
    this.setState({ [data.name]: data.value })
  }

  onSubmit = async (event) => {
    event.preventDefault()

    console.log('ings', this.state.ingredients)
    const oldTitle = this.props.recipes.find(r => r.title === this.state.title)
    if (!oldTitle) { 

      const ingredients = await Promise.all(this.state.ingredients.map(async (ing) => {
        const ingredientObject = {
          quantity: ing.quantity,
          unit: ing.unit,
          name: ing.name
        }
        return await this.props.newIngredient(ingredientObject)
      }))

      const recipeObject = {
        title: this.state.title,
        ingredients,
        instructions: this.state.instructions,
        tags: this.state.tags
      }

      const newRecipe = await this.props.newRecipe(recipeObject)

      this.props.newSuccessNotification('Uusi resepti luotu', 5)

      this.setState({
        title: '',
        ingredients: [{ quantity: '', unit: '', name: '' }],
        instructions: '',
        tags: [],
        newRecipe
      })

    } else {
      this.props.newErrorNotification('Reseptin nimi on jo käytössä. Valitse toinen nimi.', 5)
    }
  }

  render() {
    if (this.state.newRecipe.id) {
      return <Redirect to={`/recipes/${this.state.newRecipe.id}`}/>
    }
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
              <Form.Input fluid
                name='quantity'
                placeholder='määrä'
                type='number'
                min='0'
                step='any'
                value={ingredient.quantity}
                onChange={this.handleIngredientChange(idx)}
              />
              <Form.Select fluid
                name='unit'
                options={this.populateOptions(this.props.units)}
                placeholder='yksikkö'
                value={ingredient.unit}
                onChange={this.handleIngredientChange(idx)}
              />
              <Form.Select fluid
                name='name'
                options={this.populateOptions(this.props.ingredients)}
                search
                placeholder='raaka-aine'
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
            fluid multiple selection options={this.populateOptions(this.props.tags)}
            search
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

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes
  }
}

export default connect(
  mapStateToProps,
  { newRecipe, newIngredient, newSuccessNotification, newErrorNotification }
)(NewRecipe)