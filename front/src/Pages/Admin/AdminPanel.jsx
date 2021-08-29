import { useState } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import classes from "../styles/AdminPanel.module.css";

const AdminPanel = () => {
  const [panelSettings, setPanelSettings] = useState({ option: "approve" });

  const switcher = () => {
    switch (panelSettings.option) {
      case "approve":
        return <p> Approving</p>;

      case "setAdmin":
        return <p> Adding admin</p>;

      case "update":
        return <p> Updating questions</p>;

      default:
        return <p>Unknown options</p>;
    }
  };

  const setOption = (newOption) => {
    setPanelSettings({...panelSettings, option: newOption})
  }

  return (
    <div className={classes.container}>
      <Row>
        <Col xs={2}>
          <ButtonGroup vertical className="d-grid gap-2">
            <Button variant="outline-dark" onClick={() => {setOption("approve")}}>Approve question</Button>
            <Button variant="outline-dark" onClick={() => {setOption("setAdmin")}}>Add administrator</Button>
            <Button variant="outline-dark" onClick={() => {setOption("update")}}>Update question</Button>
            <Button variant="outline-dark" onClick={() => {setOption("nqweq")}}>Another</Button>
          </ButtonGroup>
        </Col>
        <Col>{switcher()}</Col>
      </Row>
    </div>
  );
};

export default AdminPanel;
