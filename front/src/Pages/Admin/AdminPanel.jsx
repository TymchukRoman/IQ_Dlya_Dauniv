import { useState, useEffect } from "react";
import { Button, ButtonGroup, Col, Row, Accordion, Badge, Form, Table } from "react-bootstrap";
import { getPendQuestions, approve, getLogs, findUser, promoteUser, findQuestion } from "../../Axios/api";
import classes from "../styles/AdminPanel.module.css";
import Preloader from "../Assets/Preloader";
import { useFormik } from "formik";

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
        <Button className={classes.clearLogs}> Clear logs </Button>
        {logs.map((log) => {
          return <Accordion key={log._id}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{body(log.key)} {"  "} {log.msg}</Accordion.Header>
              <Accordion.Body>
                <div><b className={classes.fieldKey}>ID: </b> {log._id}</div>
                <div><b className={classes.fieldKey}>Location: </b> <Badge bg="secondary">{log.func}</Badge></div>
                <div><b className={classes.fieldKey}>Data: </b> {JSON.stringify(log.data)}</div>
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

        <Button type="submit" className="mb-2" onClick={() => { promote(userData._id, userData.email) }}>
          Promote to admin
        </Button>
      </div>
    }
  </div>
}

const QuestionPanel = () => {
  const [questionData, setQuestionData] = useState(null);
  const [loader, setLoader] = useState(false);

  const getQuestionData = (questionId) => {
    setLoader(true)
    let token = localStorage.getItem('token')
    findQuestion(token, questionId).then((response) => {
      setQuestionData({ ...response.data })
      setLoader(false)
    })
  }

  const formik = useFormik({
    initialValues: {
      questionId: "",
    },
    onSubmit: (values) => {
      getQuestionData(values.questionId)
    }
  });

  return <div>
    <Form onSubmit={formik.handleSubmit} >
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Control name="questionId"
            onChange={formik.handleChange}
            value={formik.values.questionId}
            type="text" className="mb-2"
            id="inlineFormInput"
            placeholder="Question id" />
        </Col>
        <Col xs="auto">
          <Button type="submit" className="mb-2">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
    {(loader && !questionData) && <Preloader />}
    {questionData ? <div>
      {JSON.stringify(questionData.statistic)}
      <Table striped bordered hover>
        <tbody>
          {Object.keys(questionData.question).map((key) => {
            return <tr key={key}>
              <td>{key}</td>
              <td className={classes.tdData}>{JSON.stringify(questionData.question[key])}</td>
            </tr>
          })}
        </tbody>
      </Table>
    </div> : "None"}
  </div>
}

export default AdminPanel;
