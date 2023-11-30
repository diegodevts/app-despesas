import axios from 'axios'

const URL = process.env.REACT_APP_API_BASE_URL
const token = localStorage.getItem('token')

export async function login(email, password) {
  try {
    const response = await axios
      .post(`${URL}/user/login`, { email, password })
      .then((response) => response)

    return { token: response.data.token }
  } catch (error) {
    return { message: error.response.data.message }
  }
}

export async function addExpense(data) {
  const request = await axios
    .post(`${URL}/expense/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => response)

  if (request.status !== 201) {
    return request.data.message
  }

  return request.data.message
}

export async function updateExpense(data, id) {
  const token = localStorage.getItem('token')

  const request = await axios
    .put(`${URL}/expense/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => response)

  if (request.status !== 200) {
    return false
  }

  return request.data.message
}

export async function removeExpense(id) {
  const request = await axios
    .delete(`${URL}/expense/remove/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => response)

  if (request.status !== 200) {
    return false
  }

  return request.data.message
}

export async function getExpenses(month) {
  const token = localStorage.getItem('token')

  const request = await axios
    .get(`${URL}/expense/all?month=${month}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => response)

  if (request.status !== 200) {
    return false
  }

  return request.data.expenses
}
