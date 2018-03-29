import axios from 'axios'
const baseUrl = '/api/recipeNotes'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (recipeid, userid) => {
  const response = await axios.get(`${baseUrl}/${recipeid}/${userid}`)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (recipeid, userid, updatedObject) => {
  console.log('upd', recipeid, userid, updatedObject)
  const response = await axios.put(`${baseUrl}/${recipeid}/${userid}`, updatedObject)
  return response.data
}

export default { getAll, getOne, create, setToken, update }