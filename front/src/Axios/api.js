import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000/",
});

export const getQuestions = async () => {
  return client.get("getQuestions");
};

export const postData = (data) => {
  let array = [
    data.answersList0,
    data.answersList1,
    data.answersList2,
    data.answersList3,
  ];
  console.log(data);
  return client.post("addQuestion", {
    qText: data.qText,
    rigthAnswer: data.rigthAnswer,
    answerList: [...array],
    login: data.login,
    password: data.password,
  });
};

export const loginAPI = (data) => {
  return client.post("user/login", {
    email: data.email,
    password: data.password
  })
}

export const registerAPI = (data) => {
  return client.post("user/register", {
    email: data.email,
    password: data.password,
    age: data.age,
    nickname: data.nickname
  })
}

export const meAPI = (token) => {
  return client.post("user/me", { token })
}