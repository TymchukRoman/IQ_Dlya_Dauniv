import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useFormik } from "formik";
import { postData } from "../../../Axios/api";
import classes from "./Add.module.css"

const AddTest = (props) => {
  const formik = useFormik({
    initialValues: {
      qText: "",
      rigthAnswer: "",
      answersList0: "",
      answersList1: "",
      answersList2: "",
      answersList3: "",
      password: "",
      login: "",
    },
    onSubmit: (values) => {
      postData(values);
      console.log("hi");
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <fieldset >
        <FormGroup>
          <Label for="name">Name of qText</Label>
          <Input
            name="qText"
            onChange={formik.handleChange}
            value={formik.values.qText}
            type="textarea"
            placeholder="Текст питання"
          />
        </FormGroup>
        <FormGroup>
          <Label for="name">right_answer</Label>
          <Input
            name="rigthAnswer"
            onChange={formik.handleChange}
            value={formik.values.rigthAnswer}
            type="textarea"
            placeholder="Правильна відповідь"
          />
        </FormGroup>
      </fieldset>
      <FormGroup>
        <fieldset>
          <label className={classes.Field}>
            <Label for="name">answersList</Label>
            <Input
              name="answersList0"
              onChange={formik.handleChange}
              value={formik.values.answersList0}
              type="textarea"
              placeholder="Варіанти відповіді"
            />
          </label>
          <label className={classes.Field}>
            <Input
              name="answersList1"
              onChange={formik.handleChange}
              value={formik.values.answersList1}
              type="textarea"
              placeholder="Варіанти відповіді"
            />
          </label>

          <br />
        </fieldset>
        <fieldset>
          <label className={classes.Field}>
            <Input
              name="answersList2"
              onChange={formik.handleChange}
              value={formik.values.answersList2}
              type="textarea"
              placeholder="Варіанти відповіді"
            />
          </label>

          <label className={classes.Field}>
            <Input
              name="answersList3"
              onChange={formik.handleChange}
              value={formik.values.answersList3}
              type="textarea"
              placeholder="Варіанти відповіді"
            />
          </label>
          <br />
        </fieldset>
      </FormGroup>

      <div className="form-group">
        <label>login</label>
        <input
          name="login"
          onChange={formik.handleChange}
          value={formik.values.login}
          type="login"
          className="form-control"
          placeholder="Enter login"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          type="password"
          className="form-control"
          placeholder="Enter password"
        />
      </div>
      <Button>Submit</Button>
    </Form>
  );
};

export default AddTest;
