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
    console.log('like', like)
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
    const user = this.props.user
    const note = this.props.note

    if (!recipe) {
      return null
    }

    let noteToShow = null
    if (user.id &&
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
      tags = (<div>{recipe.tags.map(t => <Label key={t._id}>{t.name}</Label>)}</div>)
    }

    let edit = null
    if (user.id === recipe.user._id) {
      edit = (<Button onClick={this.showEditRecipe} color='black'>Muokkaa reseptiä</Button>)
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
    if (this.props.emphasis) {
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
        <Grid.Column width={6}>
          <h1>{recipe.title}</h1>
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
          {noteToShow}
          {this.state.showNoteForm && <NoteForm recipe={recipe} />}
          {this.state.showEditNoteForm && <EditNote note={note} />}
          {emphasis}
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(
  null,
  { newLike, deleteLike, deleteRecipeNote, newSuccessNotification }
)(RecipeInfo)