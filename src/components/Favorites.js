import React from 'react'
import { Button, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Favorites extends React.Component {

  state = {
    all: true,
    liked: false,
    own: false
  }

  handleLikedClick = (event) => {
    this.setState({
      all: false,
      liked: false,
      own: false
    })
    console.log('c', event.target.value)
  }

  render() {

    const user = this.props.allUsers.find(au => au.id === this.props.user.id)

    const buttons = (
      <Button.Group>
        <Button onClick={this.handleLikedClick} value={this.state.liked}>Tykätyt</Button>
        <Button onClick={this.handleAllClick} value={this.state.all}>Kaikki</Button>
        <Button onClick={this.handleOwnClick} value={this.state.own}>Omat</Button>
      </Button.Group>
    )

    let recipeIds = null
    console.log('u', user)
    if (this.state.all) {
      recipeIds = user.recipes.concat(user.likedRecipes)
    } else if (this.state.liked) {
      recipeIds = user.likedRecipes
    } else {
      recipeIds = user.recipes
    }

    const recipes = this.props.recipes.filter(r => recipeIds.indexOf(r.id !== -1))

    if (!recipes) {
      return null
    }

    return (
      <div>
        <h2>Suosikkireseptit</h2>
        <div>{buttons}</div>
        <Table basic='very'>
          <Table.Body>
            {recipes.map(r =>
              <Table.Row key={r.id}>
                <Table.Cell>
                  <Link to={`/recipes/${r.id}`}>{r.title}</Link>
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
    recipes: state.recipes
  }
}

export default connect(
  mapStateToProps
)(Favorites)