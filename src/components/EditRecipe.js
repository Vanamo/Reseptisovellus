import React from 'react'
import { connect } from 'react-redux'
import { updateRecipe } from './../reducers/recipeReducer'
import { newIngredient } from './../reducers/ingredientReducer'
import { newSuccessNotification } from './../reducers/notificationReducer'
import { Form, Button } from 'semantic-ui-react'

class EditRecipe extends React.Component {

  state = {
    title: this.props.recipe.title,
    ingredients: this.props.recipe.ingredients
      .map(i => ({ quantity: i.quantity, name: i.name._id, unit: i.unit._id })),
    instructions: this.props.recipe.instructions,
    tags: this.props.recipe.tags.map(t => t._id),
    cancel: false
  }


  populateOptions = (options) => {
    return options.map(o => ({ key: o.id, text: o.name, value: o.id }))
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

    const ingredients = await Promise.all(this.state.ingredients.map(async (ing) => {
      const ingredientObject = {
        quantity: ing.quantity,
        unit: ing.unit,
        name: ing.name
      }
      return await this.props.newIngredient(ingredientObject)
    }))

    const recipe = this.props.recipe

    const changedRecipe = {
      id: recipe.id,
      title: this.state.title,
      ingredients,
      instructions: this.state.instructions,
      likes: recipe.likes,
      tags: this.state.tags,
      user: recipe.user,
      likedUsers: recipe.likedUsers
    }

    await this.props.updateRecipe(changedRecipe)

    this.props.newSuccessNotification('Resepti on päivitetty', 5)

    this.setState({
      title: '',
      ingredients: [{ quantity: '', unit: '', name: '' }],
      instructions: '',
      tags: [],
      cancel: true
    })
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
        <h2>Muokkaa reseptiä</h2>
        <Form>
          <Form.Input
            label='Reseptin nimi'
            name='title'
            value={this.state.title}
            onChange={this.handleFieldChange}
          />
          <strong>Ainekset</strong>
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
            fluid multiple selection
            options={this.populateOptions(this.props.tags)}
            search
            placeholder=''
            name='tags'
            value={this.state.tags}
            onChange={this.handleTagChange}
          />
        </Form>
        <p></p>
        <Button positive onClick={this.onSubmit}>Tallenna muutokset</Button>
        <Button negative onClick={this.onCancel}>Peruuta</Button>
      </div>
    )
  }
}


const sortAlphabetically = (a, b) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}

const mapStateToProps = (state) => {
  return {
    units: state.ingredientUnits.sort(sortAlphabetically),
    ingredients: state.ingredientNames.sort(sortAlphabetically),
    tags: state.tags.sort(sortAlphabetically)
  }
}

export default connect(
  mapStateToProps,
  { updateRecipe, newIngredient, newSuccessNotification }
)(EditRecipe)