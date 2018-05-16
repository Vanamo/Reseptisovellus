import React from 'react'
import { connect } from 'react-redux'
import { updateRecipe } from './../reducers/recipeReducer'
import { newIngredient } from './../reducers/ingredientReducer'
import { newErrorNotification } from './../reducers/notificationReducer'
import { newIngredientUnit } from './../reducers/ingredientUnitReducer'
import { newIngredientName } from './../reducers/ingredientNameReducer'
import { newTag } from './../reducers/tagReducer'
import { Form, Button } from 'semantic-ui-react'

class EditRecipe extends React.Component {

  state = {
    title: this.props.recipe.title,
    ingredients: this.props.recipe.ingredients
      .map(i => ({
        quantity: i.quantity,
        name: i.name._id,
        unit: i.unit._id,
        subheading: i.subheading,
        type: i.type
      })),
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

    let usedTitle = false
    if (this.state.title !== this.props.recipe.title) {
      usedTitle = this.props.recipes.find(r => r.title === this.state.title)
    }
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

      this.setState({
        title: '',
        ingredients: [],
        instructions: '',
        tags: [],
        cancel: true
      })
    }
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
          {this.state.ingredients.map((ingredient, idx) => {
            if (ingredient.type === 'title') {
              return (
                <Form.Group widths='equal' key={idx}>
                  <Form.Input
                    fluid
                    name='name'
                    defaultValue={ingredient.subheading}
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
    recipes: state.recipes,
    units: state.ingredientUnits.sort(sortAlphabetically),
    ingredients: state.ingredientNames.sort(sortAlphabetically),
    tags: state.tags.sort(sortAlphabetically)
  }
}

export default connect(
  mapStateToProps,
  { updateRecipe, newIngredient,
    newErrorNotification, newIngredientUnit,
    newIngredientName, newTag }
)(EditRecipe)