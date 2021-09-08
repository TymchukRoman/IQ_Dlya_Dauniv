import { useState, useEffect } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { getPendQuestions, approve } from "../../Axios/api";
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
          <Button onClick={() => {approveQuestion(question._id)}}>Approve</Button>
        </div>
      })
      : <Preloader />
    }
  </div>
}

export default AdminPanel;
