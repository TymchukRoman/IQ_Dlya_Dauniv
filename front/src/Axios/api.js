import axios from 'axios'

const client = axios.create({
  baseURL: 'https://iqdauntest.herokuapp.com/',
  withCredentials: false,
})

export const getQuestions = async () => {
  return client.get('getQuestions')
}

export const getLeaderboards = async () => {
  return client.get('getLeaderboards')
}

export const checkResult = async (data) => {
  return client.post('checkResults', {
    token: data.token,
    answers: data.answers,
  })
}

export const postData = (data) => {
  let array = [
    data.answersList0,
    data.answersList1,
    data.answersList2,
    data.answersList3,
  ]
  console.log(data)
  return client.post('addQuestion', {
    qText: data.qText,
    rigthAnswer: data.rigthAnswer,
    answerList: [...array],
    token: data.token,
  })
}

export const loginAPI = (data) => {
  return client.post('user/login', {
    email: data.email,
    password: data.password,
  })
}

export const registerAPI = (data) => {
  return client.post('user/register', {
    email: data.email,
    password: data.password,
    age: data.age,
    nickname: data.nickname,
  })
}

export const meAPI = (token) => {
  return client.post('user/me', { token })
}

export const approve = (token, questionId) => {
  return client.post('approveQuestion', { questionId, token })
}

export const getPendQuestions = (token) => {
  return client.post('getPendQuestions', { token })
}

export const getResult = (resultId) => {
  return client.post('getResult', { resultId })
}

export const getLogs = (token) => {
  return client.post('getLogs', { token })
}

export const clearLogs = (token) => {
  return client.post('clearLogs', { token })
}

export const findUser = (token, email) => {
  return client.post('user/findUser', { token, email })
}

export const promoteUser = (token, id) => {
  return client.post('user/promoteUser', { token, id })
}

export const demoteUser = (token, id) => {
  return client.post('user/demoteUser', { token, id })
}

export const banUser = (token, id) => {
  return client.post('user/banUser', { token, id })
}

export const findQuestion = (token, id) => {
  return client.post('findQuestion', { token, id })
}

export const updateQuestion = (token, id, newData) => {
  return client.post('updateQuestion', { token, id, newData })
}

export const searchQuestions = (token, page, searchType, searchValue) => {
  return client.post('searchQuestions', { token, page, data: { searchType, searchValue } })
}