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
    nickname: data.nickname,
  });
};
