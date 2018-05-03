import React from 'react'
import { newRecipeEmphasis, updateRecipeEmphasis, deleteRecipeEmphasis } from './../reducers/recipeEmphasisReducer'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

class RecipeEmphasis extends React.Component {

  state = {
    value: this.props.emphasis.content || 'no'
  }

  handleChange = async (e, { value }) => {
    this.setState({ value })

    if (value !== 'no') {
      const emphasisObject = {
        content: value,
        recipeid: this.props.recipe.id
      }
      const newEmphasis = await this.props.newRecipeEmphasis(emphasisObject)
      this.setState({
        value: newEmphasis.content
      })
    }
  }

  render() {
    console.log('e', this.props.emphasis)
    if (!this.props.user.id) {
      return null
    }
    return (
      <div>
        <h3>Painotus ruokalistalla</h3>
        <Form>
          <Form.Radio
            label='ei ruokalistalla'
            name='menuEmphasis'
            value='no'
            checked={this.state.value === 'no'}
            onChange={this.handleChange}
          />
          <Form.Group inline>
            <Form.Radio
              label='-1'
              name='menuEmphasis'
              value={-1}
              checked={this.state.value === -1}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='0'
              name='menuEmphasis'
              value={0}
              checked={this.state.value === 0}
              onChange={this.handleChange}
            />
            <Form.Radio
              label='1'
              name='menuEmphasis'
              value={1}
              checked={this.state.value === 1}
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default connect(
  null,
  { newRecipeEmphasis, updateRecipeEmphasis, deleteRecipeEmphasis }
)(RecipeEmphasis)