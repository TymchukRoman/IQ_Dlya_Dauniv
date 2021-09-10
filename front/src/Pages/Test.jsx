// import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { checkResult, getQuestions } from "../Axios/api";
import { Carousel, Modal } from "react-bootstrap";
import { Button } from "reactstrap";
import classes from "./styles/Test.module.css";
import Preloader from "./Assets/Preloader";
import { Redirect } from "react-router-dom";

const Test = () => {
  //eslint-disable-next-line
  const [refresh, setRefresh] = useState(0);
  const [question, setQuestion] = useState([]);
  const [show, setShow] = useState(false);
  const [hints, setHints] = useState([])
  const [index, setIndex] = useState(0);
  const [submited, setSubmited] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
  };

  useEffect(() => {
    getQuestions().then((res) => {
      // console.log(res.data.questions);
      if (res.data.err) {
        console.log(res.data.err)
      } else {
        setQuestion(
          res.data.questions.map((item) => {
            return {
              qText: item.qText,
              answerList: item.answerList,
              _id: item._id,
              author: item.author,
              answer: "",
            };
          })
        );
      }
      let number = 0;
      setHints(res.data.questions.map((item) => {
        let exNumber = number;
        number++;
        return {
          qId: item._id,
          number: exNumber,
          status: "black"
        };
      })
      )
    });
  }, []);

  useEffect(() => {
    checkReady()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  const submitResults = () => {
    let token = localStorage.getItem('token')
    let answers = question.map((item) => {
      return {
        id: item._id,
        answer: item.answer
      }
    })
    checkResult({
      token,
      answers: [...answers]
    }).then((res) => {
      console.log(res.data.resultId)
      setSubmited(res.data.resultId)
    })
  }

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
    setActive(qId);
    refreshPage();
  };

  const setActive = (qId) => {
    setHints(hints.map((item) => {
      if (item.qId === qId) {
        return {
          qId: item.qId,
          number: item.number,
          status: "green"
        }
      }
      return {
        qId: item.qId,
        number: item.number,
        status: item.status
      }
    }))
  }

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
    if (counter === 10) {
      handleShow()
    }
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      {submited && <Redirect to={`/result/${submited}`} />}
        {question.length
          ? <Carousel activeIndex={index} onSelect={handleSelect} variant="dark" pause="hover" indicators={false} fade>
            {question.map((q) => {
              return (
                <Carousel.Item key={q._id}>
                  <img
                    alt=""
                    className={"d-block " + classes.caroImg}
                  // src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
                  ></img>
                  <Carousel.Caption >
                    <Hints hints={hints} handleSelect={handleSelect} index={index} />
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
          : <Preloader />
        }

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ready to submit test?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => { handleClose(); submitResults() }}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
  );
};

const Hints = (props) => {
  return <div>
        {props.hints.map((item) => {
          if (item.number === props.index) {
            return <div
              className={classes.hint}
              key={item.qId}
              onClick={() => { props.handleSelect(item.number) }}
              style={{ color: item.status, fontWeight: "bold" }}>
              {"  " + (item.number + 1) + "  "}
            </div>
          }
          return <div
            className={classes.hint}
            key={item.qId}
            onClick={() => { props.handleSelect(item.number) }}
            style={{ color: item.status }}>
            {"  " + (item.number + 1) + "  "}
          </div>
        })}
      </div>
}

      export default Test;
