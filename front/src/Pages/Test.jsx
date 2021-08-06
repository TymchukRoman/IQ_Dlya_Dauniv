// import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { getQuestions } from "../Axios/api";
import { Carousel, Modal } from "react-bootstrap";
import { Input, Button } from "reactstrap";
import classes from "./Test.module.css";

const Test = () => {
  //eslint-disable-next-line
  const [refresh, setRefresh] = useState(0);
  const [question, setQuestion] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
  };

  useEffect(() => {
    getQuestions().then((response) => {
      // console.log(response.data.data);
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

  useEffect(() => {
    checkReady()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  const refreshPage = () => {
    setRefresh(refresh + 1);
  };

  const setAnswer = (qId, answer) => {
    const updatedList = question.map((item) => {
      let answerChange = item.answer;
      if (qId === item._id) {
        answerChange = answer;
      }

      return {
        qText: item.qText,
        answerList: item.answerList,
        _id: item._id,
        author: item.author,
        answer: answerChange,
      };
    });
    setQuestion([...updatedList]);
    refreshPage();
  };

  const checkSelected = (qId, answer) => {
    let toReturn = false
    question.forEach((item) => {
      if (item._id === qId && item.answer === answer) {
        toReturn = true
      }
    });
    return toReturn;
  };

  const checkReady = () => {
    let counter = 0;
    question.forEach((item) => {
      if (item.answer !== "") {
        counter++;
      }
    })
    console.log(counter)
    if (counter === 10) {
      handleShow()
    }
  }

  return (
    <div>
      <Carousel variant="dark" pause="hover" fade>
        {question.map((q) => {
          return (
            <Carousel.Item key={q._id}>
              <img
                alt=""
                className={"d-block " + classes.caroImg}
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your nickname</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input type="text"> </Input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Test;
