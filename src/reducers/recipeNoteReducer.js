import recipeNoteService from './../services/recipeNotes'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_RECIPENOTES':
    return action.data
  case 'NEW_RECIPENOTE':
    return [...state, action.data]
  case 'UPDATE_RECIPENOTE': {
    const changedRecipeNote = action.data.changedRecipeNote
    const id = changedRecipeNote.id
    return state.map(n => n.id !== id ? n : changedRecipeNote)
  }
  }
  return state
}

export const newRecipeNote = (noteObject) => {
  return async (dispatch) => {
    const note = await recipeNoteService.create(noteObject)
    const newNote = await recipeNoteService.getOne(note.recipeid, note.userid)
    dispatch({
      type: 'NEW_RECIPENOTE',
      data: newNote
    })
  }
}

export const initRecipeNotes = () => {
  return async (dispatch) => {
    const recipeNotes = await recipeNoteService.getAll()
    console.log('init', recipeNotes)
    dispatch({
      type: 'INIT_RECIPENOTES',
      data: recipeNotes
    })
  }
}

export default reducer