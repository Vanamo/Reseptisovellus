import recipeNoteService from './../services/recipeNotes'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_RECIPENOTE':
    return [...state, action.data]
  case 'UPDATE_RECIPENOTE': {
    const changedRecipeNote = action.data.changedRecipeNote
    const id = changedRecipeNote.id
    return state.map(n => n.id !== id ? n : changedRecipeNote)
  }
  }
}


export default reducer