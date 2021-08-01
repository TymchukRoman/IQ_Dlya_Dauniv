import axios from "axios";

export const getData = () => {
  return axios.get("http://localhost:4000/getData");
};

export const postData = (data) => {
  return axios.post("http://localhost:4000/postData", {
    question: data.qText,
    right_answer: data.rigthAnswer,
    answers_list : data.answerList, 
    postId: data.postId,
  });
};

