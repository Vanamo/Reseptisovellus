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
      ['all', 'liked', 'own'].reduce((obj, avain) =>
        ({ ...obj, [avain]: avain === value })
        , {})
    )
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

  render() {
    if (!this.props.user || !this.props.emphases) {
      return null
    }

    const user = this.props.user

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

    const sortAlphabetically = (a, b) => {
      if (a.title < b.title) return -1
      if (a.title > b.title) return 1
      return 0
    }

    if (!recipes) {
      return null
    }

    return (
      <div>
        <h2>Suosikkireseptit</h2>
        <div>{buttons}</div>
        <Table basic='very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Reseptejä yhteensä {recipes.length} kpl</Table.HeaderCell>
              <Table.HeaderCell>Painotus ruokalistalla</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {recipes.sort(sortAlphabetically)
              .map(r =>
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
)(Favorites)