// import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { getQuestions } from "../../../Axios/api";
import { Carousel } from "react-bootstrap";
import { Input, Button, Label } from "reactstrap";
import classes from "./Test.module.css";

const Test = () => {
  //eslint-disable-next-line
  const [refresh, setRefresh] = useState(0);
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    getQuestions().then((response) => {
      response.data.data.forEach((item) => {});
      // (response.data.data);
      setQuestion(
        response.data.data.map((item) => {
          return {
            qText: item.qText,
            answerList: item.answerList,
            _id: item._id,
            author: item.author,
            answer: "",
          };
        })
      );
    });
  }, []);

  const refreshPage = () => {
    setRefresh(refresh + 1);
  };

  const setAnswer = (qId, answer) => {
    const updatedList = question.map((item) => {
      let answerChange = item.answer;
      if (qId === item._id) {
        answerChange = answer;
      }

      const rewrite = {
        qText: item.qText,
        answerList: item.answerList,
        _id: item._id,
        author: item.author,
        answer: answerChange,
      };
      return { ...rewrite };
    });
    setQuestion([...updatedList]);
    refreshPage();
    console.log(checkSelected(qId, answer));
  };

  const checkSelected = (qId, answer) => {
    let toReturn = false
    question.forEach((item) => {
      if (item._id === qId && item.answer === answer) {
        toReturn = true
        console.log("true");
      }
    });
    return toReturn;
  };

  return (
    <div>
      <Carousel variant="dark">
        {question.map((q) => {
          return (
            <Carousel.Item key={q._id}>
              <img
                alt=""
                className="d-block w-100"
                src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
              ></img>
              <Carousel.Caption >
                <div className={classes.case} >
                <h3>{q.qText}</h3>
                {q.answerList.map((item) => {
                  return (
                    <div key={item}>
                      <div>
                        {checkSelected(q._id, item) === true ? (
                          <button
                            className={classes.TestBtnActive}
                            onClick={() => {
                              setAnswer(q._id, item);
                            }}
                          >
                            {item}
                          </button>
                        ) : (
                          <button
                            className={classes.TestBtn}
                            onClick={() => {
                              setAnswer(q._id, item);
                            }}
                          >
                            {item}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>

      <Label for="name">Nickname</Label>
      <Input type="text" />
      <Button>Submit</Button>
    </div>
  );
};
export default Test;
