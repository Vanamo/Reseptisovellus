import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class RecipeMenu extends React.Component {

  state = {
    items: undefined,
    recipes: []
  }

  emphasis = (recipe) => {
    const emphasis = this.props.emphases.filter(e => e.userid === this.props.user.id)
      .find(e => e.recipeid === recipe.id)
    if (emphasis) {
      return <p color='black'>{emphasis.content}</p>
    } else {
      return <p color='black'>ei ruokalistalla</p>
    }
  }

  handleChange = (e, { value }) => {
    this.setState({ value })
  }

  recipes = () => {
    const recipeIds = this.props.emphases.filter(e => e.userid === this.props.user.id)
      .map(e => e.recipeid)
    const recipes = this.props.recipes.filter(r => recipeIds.indexOf(r.id) !== -1)
    return recipes
  }

  onSubmit = (e) => {
    e.preventDefault()

    //console.log('r', recipes)

    const user = this.props.allUsers.find(au => au.id === this.props.user.id)

    //const updatedUser = { ...user, drawnRecipes }
  }

  render() {

    if (!this.props.recipes.length || !this.props.emphases || !this.props.allUsers.length) {
      return null
    }

    const user = this.props.allUsers.find(au => au.id === this.props.user.id)

    let recipes = null
    if (!user.drawnRecipes.length) {
      recipes = this.recipes()
    } else {
      recipes = user.drawnRecipes
    }


    if (recipes.length < 1) {
      return (<h3>Et ole valinnut yhtään reseptiä ruokalistalle</h3>)
    }

    return (
      <div>
        <h2>Ruokalista</h2>

        <h3>
          <Form>
            <Form.Group>
              <Form.Field inline>
                <label>Kuinka monta reseptiä arvotaan ruokalistalle:</label>
                <Input name='items' type='number' min='1' step='1' max={recipes.length}
                  onChange={this.handleChange} />
              </Form.Field>
              <Button type='submit' onSubmit={this.onSubmit}>Arvo</Button>
            </Form.Group>
          </Form>
        </h3>

        <Table basic='very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Reseptejä yhteensä {recipes.length} kpl</Table.HeaderCell>
              <Table.HeaderCell>Painotus ruokalistalla</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {recipes.map(r =>
              <Table.Row key={r.id}>
                <Table.Cell>
                  <Link to={`/recipes/${r.id}`}>{r.title}</Link>
                </Table.Cell>
                <Table.Cell>
                  {this.emphasis(r)}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.allUsers,
    recipes: state.recipes,
    emphases: state.recipeEmphases
  }
}

export default connect(
  mapStateToProps
)(RecipeMenu)