import React from 'react'
import { connect } from 'react-redux'
import { newRecipe } from './../reducers/recipeReducer'
import { newIngredient } from './../reducers/ingredientReducer'
import { newSuccessNotification, newErrorNotification } from './../reducers/notificationReducer'
import { newIngredientUnit } from './../reducers/ingredientUnitReducer'
import { newIngredientName } from './../reducers/ingredientNameReducer'
import { newTag } from './../reducers/tagReducer'
import { Form, Button } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { initUsers } from './../reducers/allUsersReducer'

class NewRecipe extends React.Component {

  state = {
    title: '',
    ingredients: [],
    instructions: '',
    tags: [],
    newRecipe: {},
  }

  populateOptions = (options) => {
    return options.map(option => ({ key: option.id, text: option.name, value: option.id }))
  }

  handleAddIngredient = () => {
    this.setState({
      ingredients: this.state.ingredients
        .concat([{ quantity: '', unit: '', name: '', subheading: '', type: 'ingredient' }])
    })
  }

  handleAddSubheading = () => {
    this.setState({
      ingredients: this.state.ingredients
        .concat([{ quantity: '', unit: '', name: '', subheading: '', type: 'title' }])
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

  handleIngredientSubheadingChange = (idx) => (event) => {
    const newIngredients = this.state.ingredients.map((ingredient, ind) => {
      if (ind !== idx) return ingredient
      return { ...ingredient, subheading: event.target.value }
    })
    this.setState({ ingredients: newIngredients })
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleTagChange = (event, data) => {
    const tags = data.value
    const newTag = String (tags[tags.length - 1])
    if (!this.props.tags.find(t => t.id === newTag)) {
      tags.pop()
    }
    this.setState({ tags })
  }

  handleUnitAddition = (idx) => async (e, { value }) => {
    const newUnit = {
      name: value
    }
    let unit = null
    if (window.confirm(`Haluatko varmasti lisätä uuden yksikön '${value}'?`)) {
      unit = await this.props.newIngredientUnit(newUnit)
    }

    const newIngredients = this.state.ingredients.map((ingredient, ind) => {
      if (ind !== idx) return ingredient
      return { ...ingredient, unit: unit.id }
    })
    this.setState({ ingredients: newIngredients })
  }

  handleIngredientNameAddition = (idx) => async (e, { value }) => {
    const newName = {
      name: value
    }
    let name = null
    if (window.confirm(`Haluatko varmasti lisätä uuden raaka-aineen '${value}'?`)) {
      name = await this.props.newIngredientName(newName)
    }

    const newIngredients = this.state.ingredients.map((ingredient, ind) => {
      if (ind !== idx) return ingredient
      return { ...ingredient, name: name.id }
    })
    this.setState({ ingredients: newIngredients })
  }

  handleTagAddition = async (e, { value }) => {
    const newTag = {
      name: value
    }
    let tag = null
    if (window.confirm(`Haluatko varmasti lisätä uuden tagin '${value}'?`)) {
      tag = await this.props.newTag(newTag)
    }

    const tags = this.state.tags.concat(tag.id)
    this.setState({ tags })
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const usedTitle = this.props.recipes.find(r => r.title === this.state.title)
    if (usedTitle) {
      this.props.newErrorNotification('Reseptin nimi on jo käytössä. Valitse toinen nimi.', 5)
    } else if (this.state.title.length < 3) {
      this.props.newErrorNotification('Reseptin nimen täytyy sisältää vähintään kolme merkkiä', 5)
    } else {

      const ingredients = await Promise.all(this.state.ingredients.map(async (ing) => {
        const ingredientObject = {
          quantity: ing.quantity,
          unit: ing.unit,
          name: ing.name,
          subheading: ing.subheading,
          type: ing.type
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
      this.props.initUsers()

      this.props.newSuccessNotification('Uusi resepti luotu', 5)

      this.setState({
        title: '',
        ingredients: [],
        instructions: '',
        tags: [],
        newRecipe
      })
    }
  }

  render() {
    if (this.state.newRecipe.id) {
      return <Redirect to={`/recipes/${this.state.newRecipe.id}`} />
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
          {this.state.ingredients.map((ingredient, idx) => {
            if (ingredient.type === 'title') {
              return (
                <Form.Group widths='equal' key={idx}>
                  <Form.Input
                    fluid
                    name='name'
                    placeholder='väliotsikko'
                    onBlur={this.handleIngredientSubheadingChange(idx)}
                  />
                  <Button
                    negative
                    onClick={this.handleRemoveIngredient(idx)}>
                    Poista
                  </Button>
                </Form.Group>
              )
            }
            return (
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
                  search
                  options={this.populateOptions(this.props.units)}
                  placeholder='yksikkö'
                  allowAdditions
                  value={ingredient.unit}
                  onChange={this.handleIngredientChange(idx)}
                  onAddItem={this.handleUnitAddition(idx)}
                />
                <Form.Select fluid
                  name='name'
                  options={this.populateOptions(this.props.ingredients)}
                  search
                  allowAdditions
                  placeholder='raaka-aine'
                  value={ingredient.name}
                  onChange={this.handleIngredientChange(idx)}
                  onAddItem={this.handleIngredientNameAddition(idx)}
                />
                <Button
                  negative
                  onClick={this.handleRemoveIngredient(idx)}>
                  Poista
                </Button>
              </Form.Group>
            )
          })}
          <Button
            type='button'
            onClick={this.handleAddIngredient}>
            Uusi raaka-aine
          </Button>
          <Button
            type='button'
            onClick={this.handleAddSubheading}>
            Uusi väliotsikko
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
            fluid
            multiple
            selection
            options={this.populateOptions(this.props.tags)}
            search
            allowAdditions
            placeholder=''
            name='tags'
            value={this.state.tags}
            onChange={this.handleTagChange}
            onAddItem={this.handleTagAddition}
          />
          <Form.Button positive>Luo resepti</Form.Button>
        </Form>
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
    recipes: state.recipes,
    units: state.ingredientUnits.sort(sortAlphabetically),
    ingredients: state.ingredientNames.sort(sortAlphabetically),
    tags: state.tags.sort(sortAlphabetically)
  }
}

export default connect(
  mapStateToProps,
  {
    newRecipe, newIngredient, newSuccessNotification,
    newErrorNotification, newIngredientUnit,
    newIngredientName, newTag, initUsers
  }
)(NewRecipe)