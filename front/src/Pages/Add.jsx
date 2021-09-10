import React from "react";
import { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useFormik } from "formik";
import { postData } from "../Axios/api";
import classes from "./styles/Add.module.css"
import { Redirect } from "react-router-dom";

const AddTest = (props) => {

  const [submited, setSubmited] = useState(false);

  const formik = useFormik({
    initialValues: {
      qText: "",
      rigthAnswer: "",
      answersList0: "",
      answersList1: "",
      answersList2: "",
      answersList3: ""
    },
    onSubmit: (values) => {
      postData({ ...values, token: localStorage.getItem("token") }).then(res => {
        if (res.data.err) {
          console.log(res.data.err)
        }
      }).then(() => {
        setSubmited(true)
      });
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit} className={classes.addForm}>
      {submited && <Redirect to="main" />}
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
            type="text"
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
              type="text"
              placeholder="Варіанти відповіді"
            />
          </label>
          <label className={classes.Field}>
            <Input
              name="answersList1"
              onChange={formik.handleChange}
              value={formik.values.answersList1}
              type="text"
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
              type="text"
              placeholder="Варіанти відповіді"
            />
          </label>

          <label className={classes.Field}>
            <Input
              name="answersList3"
              onChange={formik.handleChange}
              value={formik.values.answersList3}
              type="text"
              placeholder="Варіанти відповіді"
            />
          </label>
          <br />
        </fieldset>
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default AddTest;
