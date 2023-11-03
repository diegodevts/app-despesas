import axios from 'axios'

const URL = process.env.REACT_APP_API_BASE_URL
export async function login(email, password) {
  const request = await axios
    .post(`${URL}/login`, { email, password })
    .then((response) => response)

  if (request.status !== 200) {
    return false
  }

  return true
}

export async function addExpense(data) {
  const request = await axios
    .post(`${URL}/add`, {
      ...data,
      user_id: 'f92b715c-ff25-4263-81e5-5283e64cb4f7'
    })
    .then((response) => response)

  if (request.status !== 200) {
    return false
  }

  return request.data.message
}

export async function updateExpense(data, id) {
  const request = await axios
    .put(`${URL}/update/${id}`, data)
    .then((response) => response)

  if (request.status !== 200) {
    return false
  }

  return request.data.message
}

export async function removeExpense(id) {
  const request = await axios
    .delete(`${URL}/remove/${id}`)
    .then((response) => response)

  if (request.status !== 200) {
    return false
  }

  return request.data.message
}

export async function getExpenses() {
  const request = await axios
    .get(`${URL}/expenses?user_id=f92b715c-ff25-4263-81e5-5283e64cb4f7`)
    .then((response) => response)

  if (request.status !== 200) {
    return false
  }

  return request.data
}
