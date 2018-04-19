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

  handleClick = (event) => {
    const value = event.target.value

    this.setState(() =>
      ['all','liked', 'own'].reduce((obj, avain) =>
        ({ ...obj, [avain]: avain === value })
        , {})
    )
  }

  render() {
    if (!this.props.user.id) {
      return null
    }
    if (!this.props.allUsers.length) {
      return null
    }
    const user = this.props.allUsers.find(au => au.id === this.props.user.id)
    console.log('user', user)

    let buttonLiked = <Button onClick={this.handleClick} value={'liked'}>Tykätyt</Button>
    let buttonAll = <Button onClick={this.handleClick} value={'all'}>Kaikki</Button>
    let buttonOwn = <Button onClick={this.handleClick} value={'own'}>Omat</Button>
    if (this.state.liked) {
      buttonLiked = <Button disabled>Tykätyt</Button>
    }
    if (this.state.all) {
      buttonAll = <Button disabled>Kaikki</Button>
    }
    if (this.state.own) {
      buttonOwn = <Button disabled>Omat</Button>
    }

    const buttons = (
      <Button.Group>
        {buttonLiked}
        {buttonAll}
        {buttonOwn}
      </Button.Group>
    )

    let recipeIds = null
    if (this.state.all) {
      recipeIds = user.recipes.concat(user.likedRecipes)
    } else if (this.state.liked) {
      recipeIds = user.likedRecipes
    } else {
      recipeIds = user.recipes
    }

    const recipes = this.props.recipes.filter(r => recipeIds.indexOf(r.id) !== -1)

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