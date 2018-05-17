import React from 'react'
import { connect } from 'react-redux'
import { Button, Grid, Header, Label, Segment, Table } from 'semantic-ui-react'
import NoteForm from './NoteForm'
import EditNote from './EditNote'
import EditRecipe from './EditRecipe'
import { newLike, deleteLike } from './../reducers/likeReducer'
import { deleteRecipeNote } from './../reducers/recipeNoteReducer'
import { newSuccessNotification } from './../reducers/notificationReducer'
import LikeButton from './LikeButton'
import RecipeEmphasis from './RecipeEmphasis'

class RecipeInfo extends React.Component {

  state = {
    showNoteForm: false,
    showEditNoteForm: false,
    showEditRecipe: false
  }

  showNoteForm = () => {
    this.setState({ showNoteForm: true })
  }

  showEditNoteForm = () => {
    this.setState({ showEditNoteForm: true })
  }

  showEditRecipe = () => {
    this.setState({ showEditRecipe: true })
  }

  handleLike = async () => {
    const likeObject = {
      recipeid: this.props.recipe.id
    }

    await this.props.newLike(likeObject)

    window.location.reload()
  }

  handleDislike = async () => {
    const like = this.props.likes.find(l => l.userid === this.props.user.id)
    await this.props.deleteLike(like)

    window.location.reload()
  }

  deleteNote = () => {
    if (window.confirm('Haluatko varmasti poistaa muistiinpanon?')) {
      this.props.deleteRecipeNote(this.props.note)
      window.location.reload()
    }
  }

  render() {
    const recipe = this.props.recipe
    const note = this.props.note

    if (!recipe || !this.props.allUsers.length) {
      return null
    }

    let user = this.props.user
    if (this.props.user.id) {
      user = this.props.allUsers.find(au => au.id === this.props.user.id)
    }

    let userRecipes = null
    let ownRecipe = null
    if (user.id) {
      userRecipes = user.recipes.concat(user.likedRecipes)
      ownRecipe = userRecipes.find(ur => ur === recipe.id)
    }

    let noteToShow = null
    if (ownRecipe &&
      !note &&
      !this.state.showNoteForm) {
      noteToShow = (
        <Button onClick={this.showNoteForm}>Lisää muistiinpano</Button>
      )
    } else if (note && !this.state.showEditNoteForm) {
      noteToShow = (
        <div className='note'>
          <Segment compact>
            <h3>Muistiinpano</h3>
            {note.content}
            <div>
              <Button size='tiny' onClick={this.showEditNoteForm}>Muokkaa</Button>
              <Button size='tiny' negative onClick={this.deleteNote}>Poista</Button>
            </div>
          </Segment>
        </div>
      )
    }

    let instructions = null
    if (recipe.instructions) {
      instructions = (<div><h2>Valmistusohje</h2><p>{recipe.instructions}</p></div>)
    }

    let tags = null
    if (recipe.tags.length > 0) {
      tags = (<div className='tags'>{recipe.tags.map(t => <Label key={t._id}>{t.name}</Label>)}</div>)
    }

    let edit = null
    if (user.id === recipe.user._id) {
      edit = (<div><Button onClick={this.showEditRecipe} color='black'>Muokkaa reseptiä</Button></div>)
    }

    let like = null
    if (user.id && user.id !== recipe.user._id) {
      let userLikes = false
      if (recipe.likedUsers) {
        if (recipe.likedUsers.find(l => l === user.id)) {
          userLikes = true
        }
      }
      if (userLikes) {
        like = <LikeButton
          onClick={this.handleDislike}
          color='red'
          likes={this.props.likes.length}
        />
      } else {
        like = <LikeButton
          onClick={this.handleLike}
          color={undefined}
          likes={this.props.likes.length}
        />
      }
    }

    if (this.state.showEditRecipe) {
      return <EditRecipe
        recipe={recipe}
        note={note}
        user={user} />
    }

    let emphasis = null
    if (ownRecipe && this.props.emphasis) {
      emphasis = <RecipeEmphasis user={user} recipe={recipe} emphasis={this.props.emphasis} />
    }

    const quantity = (q) => {
      if (q === 0) {
        return null
      }
      return q
    }

    return (
      <Grid className='recipe'>

        <Grid.Row columns={1}>
          <Grid.Column width={16}>
            <h1>{recipe.title}</h1>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column computer={8} mobile={16}>
            {like}
            <h2>Ainekset</h2>
            <Table compact basic='very' celled collapsing id='ingredients'>
              <Table.Body>
                {recipe.ingredients.map(i => {
                  if (i.type === 'title')
                    return (
                      <Table.Row key={i.id}>
                        <Table.Cell>
                          <Header as='h3'>{i.subheading}</Header>
                        </Table.Cell>
                      </Table.Row>
                    )
                  return (
                    <Table.Row key={i.id}>
                      <Table.Cell>
                        {quantity(i.quantity)}
                      </Table.Cell>
                      <Table.Cell>
                        {i.unit.name}
                      </Table.Cell>
                      <Table.Cell>
                        {i.name.name}
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
            {instructions}
            {tags}
            {edit}
          </Grid.Column>
          <Grid.Column computer={8} mobile={16}>
            {noteToShow}
            {this.state.showEditNoteForm && <EditNote note={note} />}
            {this.state.showNoteForm && <NoteForm recipe={recipe} />}
            {emphasis}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.allUsers,
  }
}

export default connect(
  mapStateToProps,
  { newLike, deleteLike, deleteRecipeNote, newSuccessNotification }
)(RecipeInfo)