import axios from "axios";

export const getData = () => {
  return axios.get("http://localhost:4000/getData");
};

export const postData = (data) => {
  return axios.post("http://localhost:4000/postData", {
    question: data.question,
    right_answer: data.right_answer,
    answers_list : data.answers_list, 
    postId: data.postId,
  });
};

