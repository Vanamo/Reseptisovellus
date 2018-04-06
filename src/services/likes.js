import axios from 'axios'
const baseUrl = '/api/likes'

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

const deleteLike = async (recipeid, userid) => {
  const config = {
    headers: { 'Authorization': token }
  }

  await axios.delete(`${baseUrl}/${recipeid}/${userid}`, config)
}

export default { getAll, getOne, create, setToken, deleteLike }