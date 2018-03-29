import recipeNoteService from './../services/recipeNotes'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_RECIPENOTES':
    return action.data
  case 'NEW_RECIPENOTE':
    return [...state, action.data]
  case 'UPDATE_RECIPENOTE': {
    const changedRecipeNote = action.data
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
    dispatch({
      type: 'INIT_RECIPENOTES',
      data: recipeNotes
    })
  }
}

export const updateRecipeNote = (changedNote) => {
  return async (dispatch) => {
    const recipeid = changedNote.recipeid
    const userid = changedNote.userid
    await recipeNoteService.update(recipeid, userid, changedNote)
    dispatch({
      type: 'UPDATE_RECIPENOTE',
      data: { changedNote }
    })
  }
}

export default reducer