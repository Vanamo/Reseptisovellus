import React from 'react'
import { newRecipeEmphasis, updateRecipeEmphasis, deleteRecipeEmphasis } from './../reducers/recipeEmphasisReducer'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

class RecipeEmphasis extends React.Component {

  state = {
    value: this.props.emphasis.content
  }

  static getDerivedStateFromProps(nextProps) {
    console.log('props', nextProps)
  }

  handleChange = async (e, { value }) => {
    this.setState({ value })

    if (value !== 'no') {
      if (this.props.emphasis.id) {
        const changedEmphasis = { ...this.props.emphasis, content: value }
        await this.props.updateRecipeEmphasis(changedEmphasis)

        this.setState({
          value: changedEmphasis.content
        })
      } else {
        const emphasisObject = {
          content: value,
          recipeid: this.props.recipe.id
        }
        await this.props.newRecipeEmphasis(emphasisObject)
        this.setState({
          value: emphasisObject.content
        })
      }
    } else if (value === 'no') {
      await this.props.deleteRecipeEmphasis(this.props.emphasis)
    }
  }

  render() {
    console.log('e', this.props.emphasis)
    if (!this.props.user.id || !this.props.emphasis) {
      return null
    }

    return (
      <div className='emphasis'>
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
              label='+1'
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

const mapStateToProps = (state) => {
  return {
    recipeEmphases: state.recipeEmphases
  }
}

export default connect(
  mapStateToProps,
  { newRecipeEmphasis, updateRecipeEmphasis, deleteRecipeEmphasis }
)(RecipeEmphasis)