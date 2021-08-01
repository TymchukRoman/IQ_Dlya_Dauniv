import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:3000/",
});

// export const getData = () => {
//   return axios.get("http://localhost:4000/getData");
// };

export const postData = (data) => {
    let array = [data.answersList0, data.answersList1, data.answersList2, data.answersList3]
    return client.post("addQuestion", {
      qText: data.qText,
      rigthAnswer: data.rigthAnswer,
      answerList: [...array],
      login: data.login,
      password: data.password
      
    });
}
