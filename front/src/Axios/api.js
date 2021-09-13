import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:3000/',
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

export const findUser = (token, email) => {
  return client.post('user/findUser', { token, email })
}

export const promoteUser = (token, id) => {
  return client.post('user/promoteUser', { token, id })
}