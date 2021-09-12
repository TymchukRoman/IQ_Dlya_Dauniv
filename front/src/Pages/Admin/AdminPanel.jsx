import { useState, useEffect } from "react";
import { Button, ButtonGroup, Col, Row, Accordion, Badge } from "react-bootstrap";
import { getPendQuestions, approve, getLogs } from "../../Axios/api";
import classes from "../styles/AdminPanel.module.css";
import Preloader from "../Assets/Preloader"

const AdminPanel = () => {
  const [panelSettings, setPanelSettings] = useState({ option: "approve" });

  const switcher = () => {
    switch (panelSettings.option) {
      case "approve":
        return <ApproveQuestions />;

      case "setAdmin":
        return <p> Adding admin</p>;

      case "update":
        return <p> Updating questions</p>;

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
        <Col>{switcher()}</Col>
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

export default AdminPanel;
