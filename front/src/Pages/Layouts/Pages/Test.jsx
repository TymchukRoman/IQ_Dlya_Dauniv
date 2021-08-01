import { computeStyles } from "@popperjs/core";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { getQuestions } from "../../../Axios/api";

const Test = () => {
  const[question, setQuestion] = useState([])
  useEffect(()=> {
    
    getQuestions().then((response)=>{
      console.log(response)
      setQuestion([...response.data.data])
    })
  },[])
  return <div>
<p>{JSON.stringify(question)}</p>
  </div>
};
export default Test;
