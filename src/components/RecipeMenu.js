import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { updateUser } from './../reducers/allUsersReducer'

class RecipeMenu extends React.Component {

  state = {
    items: undefined,
  }

  handleChange = (e, { value }) => {
    this.setState({ items: value })
  }

  recipes = (user, flag) => {
    let emphases = this.props.emphases.filter(e => e.userid === this.props.user.id)
    if (flag) {
      emphases = emphases.filter(e => user.drawnRecipes.indexOf(e.recipeid) !== -1)      
    }
    const recipes = emphases.map(em => {
      return Object.assign({}, em, this.props.recipes.filter(re => re.id === em.recipeid)[0])
    })
    return recipes
  }

  shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  drawnRecipes = () => {
    const allRecipes = this.recipes()
    const emphasizedRecipes = []
    //more emphasized recipes are added to the array several times
    allRecipes.forEach(r => {
      if (r.content === -1) {
        emphasizedRecipes.push(r)
      } else if (r.content === 0) {
        emphasizedRecipes.push(r)
        emphasizedRecipes.push(r)
      } else if (r.content === 1) {
        emphasizedRecipes.push(r)
        emphasizedRecipes.push(r)
        emphasizedRecipes.push(r)
      }
    })
    //shuffle
    const shuffled = this.shuffle(emphasizedRecipes)
    //remove duplicate recipes
    const uniqueAndShuffled = shuffled.filter((s, ind) => shuffled.indexOf(s) === ind)
    //select the first n recipes
    const selected = uniqueAndShuffled.slice(0, this.state.items).map(r => r.id)

    return selected
  }

  findUser = () => {
    return this.props.allUsers.find(au => au.id === this.props.user.id)
  }

  handleClick = async() => {
    const user = this.findUser()
    const updatedUser = { ...user, drawnRecipes: [] }
    await this.props.updateUser(updatedUser)
  }

  onSubmit = async (e) => {
    e.preventDefault()

    const drawnRecipes = this.drawnRecipes()
    const user = this.findUser()
    const updatedUser = { ...user, drawnRecipes }

    await this.props.updateUser(updatedUser)
  }

  render() {

    if (!this.props.recipes.length || !this.props.emphases || !this.props.allUsers.length) {
      return null
    }

    const user = this.props.allUsers.find(au => au.id === this.props.user.id)

    const flag = user.drawnRecipes.length
    const recipes = this.recipes(user, flag)
    const allRecipes = this.recipes(user, false)

    let clear = null
    if (flag) {
      clear = <Button negative onClick={this.handleClick}>Tyhjennä</Button>
    }

    if (recipes.length < 1) {
      return (<h3>Et ole valinnut yhtään reseptiä ruokalistalle</h3>)
    }

    return (
      <div>
        <h2>Ruokalista</h2>

        <h3>
          <Form onSubmit={this.onSubmit}>
            <Form.Group>
              <Form.Field inline>
                <label>Kuinka monta reseptiä arvotaan ruokalistalle:</label>
                <Input name='items' type='number' min='1' step='1' max={allRecipes.length}
                  onChange={this.handleChange} />
              </Form.Field>
              <Form.Button>Arvo</Form.Button>
            </Form.Group>
          </Form>
        </h3>

        {clear}

        <Table basic='very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Reseptejä yhteensä {recipes.length}/{allRecipes.length} kpl</Table.HeaderCell>
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
                  <p color='black'>{r.content}</p>
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
  mapStateToProps,
  { updateUser }
)(RecipeMenu)