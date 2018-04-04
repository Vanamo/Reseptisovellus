import React from 'react'
import { connect } from 'react-redux'
import { newRecipe } from './../reducers/recipeReducer'
import { newIngredient } from './../reducers/ingredientReducer'
import { newSuccessNotification } from './../reducers/notificationReducer'
import { Form, Button, Select } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import RecipeInfo from './RecipeInfo'

class EditRecipe extends React.Component {

  state = {
    title: this.props.recipe.title,
    ingredients: this.props.recipe.ingredients,
    instructions: this.props.recipe.instructions,
    tags: this.props.recipe.tags
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
    console.log('tags', this.state.tags, data.value)
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

    const recipeObject = {
      title: this.state.title,
      ingredients,
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

  onCancel = (e) => {
    e.preventDefault()
    console.log('h', this.props.history)
    this.props.history.push(`/recipes/${this.props.recipe.id}`)
  }

  render() {

    const findUnit = (unit) => {
        if (!unit.name) return unit
        return this.props.units.find(u => u.name === unit.name).id
    }

    const findIngredient = (ingredient) => {
        if (!ingredient.name) return ingredient
        return this.props.ingredients.find(i => i.name === ingredient.name).id
    }

    const findTags = (tag) => {
      if (!tag.name) return tag
      return (this.props.tags.find(t => t.name === tag.name).id)
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
          <strong>Raaka-aineet</strong>
          <p></p>
          {console.log('i', this.state.ingredients)}
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
                value={findUnit(ingredient.unit)}
                onChange={this.handleIngredientChange(idx)}
              />
              <Form.Select fluid
                name='name'
                options={this.populateOptions(this.props.ingredients)}
                search
                placeholder='raaka-aine'
                value={findIngredient(ingredient.name)}
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
            value={this.state.tags.map(t => findTags(t))}
            onChange={this.handleTagChange}
          />
        </Form>
        <p></p>
        <Button.Group>
          <Button positive onClick={this.onSubmit}>Tallenna muutokset</Button>
          <Button.Or text='tai' />
          <Button negative onClick={this.onCancel}>Peruuta</Button>
        </Button.Group>
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
  { newRecipe, newIngredient, newSuccessNotification }
)(EditRecipe)