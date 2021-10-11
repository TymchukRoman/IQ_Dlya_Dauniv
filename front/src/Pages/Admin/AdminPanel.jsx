import { useState, useEffect } from "react";
import { Modal, ListGroup, Button, ButtonGroup, Col, Row, Accordion, Badge, Form, Table, Pagination } from "react-bootstrap";
import { banUser, demoteUser, getPendQuestions, approve, getLogs, findUser, promoteUser, findQuestion, updateQuestion, searchQuestions, clearLogs } from "../../Axios/api";
import classes from "../styles/AdminPanel.module.css";
import Preloader from "../Assets/Preloader";
import { useFormik } from "formik";
import { Charts } from "./Charts";
import Select from 'react-select'

const AdminPanel = () => {
  const [panelSettings, setPanelSettings] = useState({ option: "approve" });

  const switcher = () => {
    switch (panelSettings.option) {
      case "approve":
        return <ApproveQuestions />;

      case "setAdmin":
        return <UserPanel />;

      case "update":
        return <QuestionPanel />;

      case "logs":
        return <Logs />;

      default:
        return <p>Unknown options</p>;
    }
  };

  const setOption = (newOption) => {
    setPanelSettings({ ...panelSettings, option: newOption })
  }

  return (
    <div className={classes.container}>
      <Row>
        <Col xs={2}>
          <ButtonGroup vertical className="d-grid gap-2">
            <Button variant="outline-dark" onClick={() => { setOption("approve") }}>Approve question</Button>
            <Button variant="outline-dark" onClick={() => { setOption("setAdmin") }}>Add administrator</Button>
            <Button variant="outline-dark" onClick={() => { setOption("update") }}>Update question</Button>
            <Button variant="outline-dark" onClick={() => { setOption("logs") }}>Logs</Button>
            <Button variant="outline-dark" onClick={() => { setOption("nqweq") }}>Another</Button>
          </ButtonGroup>
        </Col>
        <Col xs={10}>{switcher()}</Col>
      </Row>
    </div>
  );
};

const ApproveQuestions = () => {
  const [questions, setQuestions] = useState([{ pendQuestions: [], isLoaded: false }]);

  useEffect(() => {
    let token = localStorage.getItem('token')
    token && getPendQuestions(token).then(response => {
      setQuestions({ pendQuestions: response.data.pendQuestions, isLoaded: true })
    })
  }, [])

  const approveQuestion = (id) => {
    let token = localStorage.getItem('token')
    approve(token, id)
  }

  return <div>
    {questions.isLoaded
      ? questions.pendQuestions.length === 0
        ? <div> No questions waiting for approval</div>
        : questions.pendQuestions.map(question => {
          return <div key={question._id} >
            <p>{JSON.stringify(question)}</p>
            <Button onClick={() => { approveQuestion(question._id) }}>Approve</Button>
          </div>
        })
      : <Preloader />
    }
  </div>
}

const Logs = () => {
  const [logs, setLogs] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem('token')
    getLogs(token).then((response) => {
      setLogs([...response.data.found])
    })
  }, [])

  const cLogs = () => {
    let token = localStorage.getItem('token')
    clearLogs(token).then(() => {
      getLogs(token).then((response) => {
        setLogs([...response.data.found])
      })
    })
  }

  let body = (key) => {
    switch (key) {
      case "Error":
        return <Badge className={classes.keyBadge} pill bg="danger" >
          {key}
        </Badge>
      case "Warn":
        return <Badge className={classes.keyBadge} pill bg="warning">
          {key}
        </Badge>
      case "Info":
        return <Badge className={classes.keyBadge} pill bg="info">
          {key}
        </Badge>
      default:
        return key
    }
  }

  return <div>
    {logs
      ? <div>
        <Button className={classes.clearLogs} onClick={cLogs}> Clear logs </Button>
        {logs.map((log) => {
          return <Accordion key={log._id}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{body(log.key)} {"  "} {log.msg}</Accordion.Header>
              <Accordion.Body>
                <div><b className={classes.fieldKey}>ID: </b> {log._id}</div>
                <div><b className={classes.fieldKey}>Location: </b> <Badge bg="secondary">{log.func}</Badge></div>
                <div><b className={classes.fieldKey}>Data: </b> {(log.data).trim()}</div>
                <div><b className={classes.fieldKey}>Time: </b> {log.timeStamp}</div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        })}
      </div>
      : <Preloader />}
  </div>
}


const UserPanel = () => {
  const [userData, setUserData] = useState(null);
  const [loader, setLoader] = useState(false);

  const getUserData = (email) => {
    setLoader(true)
    let token = localStorage.getItem('token')
    findUser(token, email).then((response) => {
      setUserData({ ...response.data.found })
      setLoader(false)
    })
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      getUserData(values.email)
    }
  });

  const promote = (id, email) => {
    let token = localStorage.getItem('token')
    promoteUser(token, id).then(() => {
      getUserData(email)
    })
  }

  const demote = (id, email) => {
    let token = localStorage.getItem('token')
    demoteUser(token, id).then(() => {
      getUserData(email)
    })
  }

  const ban = (id, email) => {
    let token = localStorage.getItem('token')
    banUser(token, id).then(() => {
      getUserData(email)
    })
  }

  const unban = (id, email) => {
    let token = localStorage.getItem('token')
    demoteUser(token, id).then(() => {
      getUserData(email)
    })
  }

  let results = (resultsArray) => {
    return <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Results</Accordion.Header>
        <Accordion.Body>
          {resultsArray.map((result) => {
            return <p key={result}> {result} </p>
          })}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  }

  return <div className={classes.userInfo}>
    <Form onSubmit={formik.handleSubmit} >
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Control name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            type="text" className="mb-2"
            id="inlineFormInput"
            placeholder="User email" />
        </Col>
        <Col xs="auto">
          <Button type="submit" className="mb-2">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
    {!userData && loader
      ? <Preloader />
      : userData && <div>
        <Table striped bordered hover>
          <tbody>
            {Object.keys(userData).map((key) => {
              return <tr key={key}>
                <td>{key}</td>
                <td className={classes.tdData}>{key === "results" ? results(userData[key]) : JSON.stringify(userData[key])}</td>
              </tr>
            })}
          </tbody>
        </Table>

        <Row>
          {userData.type === "user" && <Col xs="auto">
            <Button type="submit" className="mb-2" onClick={() => { promote(userData._id, userData.email) }}>
              Promote to admin
            </Button>
          </Col>
          }
          {userData.type === "admin" && <Col xs="auto">
            <Button type="submit" className="mb-2" onClick={() => { demote(userData._id, userData.email) }}>
              Demote to user
            </Button>
          </Col>
          }
          {userData.type === "user" && <Col xs="auto">
            <Button type="submit" className="mb-2" onClick={() => { ban(userData._id, userData.email) }}>
              Ban
            </Button>
          </Col>
          }
          {userData.type === "banned" && <Col xs="auto">
            <Button type="submit" className="mb-2" onClick={() => { unban(userData._id, userData.email) }}>
              Unban
            </Button>
          </Col>
          }
        </Row>
      </div>
    }
  </div>
}

const QuestionPanel = () => {
  const [questions, setQuestions] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [pages, setPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginator, setPaginator] = useState([]);


  useEffect(() => {
    getQuestions();
    setPaginator(renderPagination());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  useEffect(() => {
    setPaginator(renderPagination());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages])

  const changePage = (number) => {
    setCurrentPage(number)
  }

  const renderPagination = (pagesCount = pages) => {
    let array = []
    for (let number = 1; number <= Math.ceil(pagesCount / 10); number++) {
      array.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => { changePage(number) }}>
          {number}
        </Pagination.Item>
      )
    }
    return array
  }

  const getQuestions = (number = currentPage, searchType = "", searchValue = "") => {
    let token = localStorage.getItem('token')
    searchQuestions(token, number, searchType, searchValue).then((response) => {
      setQuestions(response.data.questions)
      setPages(response.data.pagination)
      setPaginator(renderPagination(response.data.pagination));
    })
  }

  const getQuestionData = (questionId) => {
    const token = localStorage.getItem('token')
    findQuestion(token, questionId).then((response) => {
      setQuestionData({ ...response.data })
      console.log(response.data)
    })
  }

  const formik = useFormik({
    initialValues: {
      searchType: "id",
      searchValue: "",
    },
    onSubmit: (values) => {
      console.log(values);
      getQuestions(1, values.searchType, values.searchValue)
    }
  });

  const changes = (value) => {
    formik.setFieldValue("searchType", value)
    return value
  }

  return <div>
    <Form onSubmit={formik.handleSubmit} >
      <Row className="align-items-center">

        <Col xs="sm">
          <Select
            name="searchType"
            onChange={value => { changes(value.value) }}
            className="mb-2"
            options={[
              { value: 'id', label: 'ID' },
              { value: 'qText', label: 'Question text' },
              { value: 'creator', label: 'User' },
              { value: 'datePeriod', label: 'Period' },
            ]} />
        </Col>
        <Col xs="sm">
          {formik.values.searchType === "id" && <Form.Control
            name="searchValue"
            onChange={formik.handleChange}
            value={formik.values.searchValue}
            type="text" className="mb-2"
            id="inlineFormInput"
            placeholder="Question id" />}
          {formik.values.searchType === "qText" && <Form.Control
            name="searchValue"
            onChange={formik.handleChange}
            value={formik.values.searchValue}
            type="text" className="mb-2"
            id="inlineFormInput"
            placeholder="Question text" />}
          {formik.values.searchType === "creator" && <Form.Control
            name="searchValue"
            onChange={formik.handleChange}
            value={formik.values.searchValue}
            type="text" className="mb-2"
            id="inlineFormInput"
            placeholder="Question creator" />}
          {formik.values.searchType === "datePeriod" && <Form.Control
            name="searchValue"
            onChange={formik.handleChange}
            value={formik.values.searchValue}
            type="text" className="mb-2"
            id="inlineFormInput"
            placeholder="Question created between" />}
        </Col>
        <Col xs="auto">
          <Button type="submit" className="mb-2">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
    {(questions && questionData && !questionData.err)
      && <ManyAndSingleQ questions={questions} paginator={paginator} questionData={questionData} getQuestionData={getQuestionData} />}
    {(questions && (!questionData || questionData.err))
      && <OnlyManyQ questions={questions} paginator={paginator} getQuestionData={getQuestionData} />}

  </div>
}



const OnlyManyQ = ({ questions, paginator, getQuestionData }) => {
  return <div>
    {questions ? <ListGroup>
      {questions.map((quest) => {
        return <ListGroup.Item key={quest.qText} action onClick={() => { getQuestionData(quest._id) }}>
          <Row>
            <Col xs="auto">
              <span className={classes.qText}>{quest.qText}</span>
            </Col>
            <Col xs="auto">
              <b>{" Author: "}</b>{quest.author}
            </Col>
            <Col xs="auto">
              <b>{" Created: "}</b> {quest.date}
            </Col>
          </Row>
        </ListGroup.Item>
      })}
    </ListGroup> : <Preloader />}
    <Pagination size="sm">
      {paginator.map((item) => {
        return item
      })}
    </Pagination>
  </div>
}

const ManyAndSingleQ = ({ questions, paginator, questionData, getQuestionData }) => {
  return <div className={classes.qContainer}>
    <div className={classes.Navigation}>
      {questions ? <ListGroup>
        {questions.map((quest) => {
          return <ListGroup.Item key={quest.qText} action onClick={() => { getQuestionData(quest._id) }}>
            <span className={classes.qText}>{quest.qText}</span>
          </ListGroup.Item>
        })}
      </ListGroup> : <Preloader />}
      <Pagination size="sm">
        {paginator.map((item) => {
          return item
        })}
      </Pagination>
    </div>
    <div className={classes.qData}>
      <SingleQuestion questionData={questionData} />
    </div>
  </div>
}

const SingleQuestion = ({ questionData }) => {

  const [showModal, setShowModal] = useState(false);

  const showUpdateModal = () => {
    setShowModal(true);
  }

  const closeUpdateModal = () => {
    setShowModal(false);
  }

  return <div>
    <Table bordered hover>
      <tbody>
        {questionData && Object.keys(questionData.question).map((key) => {
          return <tr key={key}>
            <td>{key}</td>
            <td className={classes.tdData}>{JSON.stringify(questionData && questionData.question[key])}</td>
          </tr>
        })}
      </tbody>
    </Table>
    <UpdateQuestionForm questionData={questionData.question} showModal={showModal} closeUpdateModal={closeUpdateModal} questionId={questionData.question._id} />
    <Button onClick={showUpdateModal}> Update Question </Button>

    <Charts questionStatistic={questionData.statistic} isnew={questionData.question.qText} rightAnswer={questionData.question.rigthAnswer} />
  </div>
}

const UpdateQuestionForm = ({ questionData, questionId, closeUpdateModal, showModal }) => {

  const [errs, setErrs] = useState([])

  useEffect(() => {
    formik.setValues({
      qText: questionData.qText,
      rigthAnswer: questionData.rigthAnswer,
      answersList0: questionData.answerList[0],
      answersList1: questionData.answerList[1],
      answersList2: questionData.answerList[2],
      answersList3: questionData.answerList[3]
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId])

  const formik = useFormik({
    initialValues: {
      qText: questionData.qText,
      rigthAnswer: questionData.rigthAnswer,
      answersList0: questionData.answerList[0],
      answersList1: questionData.answerList[1],
      answersList2: questionData.answerList[2],
      answersList3: questionData.answerList[3]
    },
    onSubmit: (values, { resetForm }) => {
      let token = localStorage.getItem('token');
      const newData = {
        qText: values.qText,
        rigthAnswer: values.rigthAnswer,
        answerList: [
          values.answersList0,
          values.answersList1,
          values.answersList2,
          values.answersList3
        ]
      }
      updateQuestion(token, questionId, newData).then((response) => {
        console.log(response.data.err)
        if (response.data.err && response.data.err.length > 0) {
          setErrs(response.data.err);
        } else {
          resetForm();
          closeUpdateModal();
        }
      })
    },
  });
  return <Form className={classes.addForm}>
    <Modal show={showModal} onHide={closeUpdateModal}>
      <Modal.Header closeButton>
        <Modal.Title>Question updator</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errs.length > 0 ? <> {JSON.stringify(errs)} <br /> </> : ""}
        <Form.Label>
          Question text
        </Form.Label>
        <Form.Control
          name="qText"
          onChange={formik.handleChange}
          value={formik.values.qText}
          type="textarea"
        />
        <Form.Label>
          Correct answer
        </Form.Label>
        <Form.Control
          name="rigthAnswer"
          onChange={formik.handleChange}
          value={formik.values.rigthAnswer}
          type="text"
        />
        <Form.Label>
          Answer list
        </Form.Label>
        <Form.Control
          name="answersList0"
          onChange={formik.handleChange}
          value={formik.values.answersList0}
          type="text"
        />
        <Form.Control
          name="answersList1"
          onChange={formik.handleChange}
          value={formik.values.answersList1}
          type="text"
        />
        <Form.Control
          name="answersList2"
          onChange={formik.handleChange}
          value={formik.values.answersList2}
          type="text"
        />
        <Form.Control
          name="answersList3"
          onChange={formik.handleChange}
          value={formik.values.answersList3}
          type="text"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={formik.handleSubmit}>
          Submit
        </Button>
        <Button variant="secondary" onClick={closeUpdateModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </Form>
}

export default AdminPanel;
