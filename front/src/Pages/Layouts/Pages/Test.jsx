// import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { getQuestions} from "../../../Axios/api";
import {Carousel } from "react-bootstrap";
import {Input,Button, Label,} from "reactstrap"
// import { useFormik } from "formik";

// const formik = useFormik({
//   initialValues: {
//     answer: "",
//     nickname:"",
//   },
//   onSubmit: (values) => {
//     postData(values);
//   },
// });
const Test = () => {
  
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    getQuestions().then((response) => {
      console.log(response);
      setQuestion([...response.data.data]);
    });
  }, []);
  return (
    <div>
      <Carousel variant="dark">
        {question.map((q) => {
          return (
            <Carousel.Item >
              <img
                alt=""
                className="d-block w-100"
                src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
              ></img>
              <Carousel.Caption>
                <h3>{q.qText}</h3>
                {q.answerList.map((item) => {
                  return <div>{item}</div>;
                })}
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
      
        <Label for="name">Nickname</Label>
        <Input type="text"/>
        <Button>Submit</Button>
    </div>
 );
};
export default Test;
