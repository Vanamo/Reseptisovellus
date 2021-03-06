import axios from 'axios'
const baseUrl = '/api/ingredients'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const deleteIngredient = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, getOne, create, deleteIngredient }