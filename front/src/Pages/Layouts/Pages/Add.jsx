import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useFormik } from "formik";
import { postData } from "../../../Axios/api";

const AddTest = (props) => {
  const formik = useFormik({
    initialValues: {
      question: "",
      right_answer: "",
      answersList0: "",
      answersList1: "",
      answersList2: "",
      answersList3: "",
      password: "",
      email: "",
    },
    onSubmit: (values) => {
      postData(values);
      console.log("hi");
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <Label for="name">Name of Question</Label>
        <Input
          name="question"
          onChange={formik.handleChange}
          value={formik.values.question}
          type="textarea"
          question="question"
          placeholder="Текст питання"
        />
      </FormGroup>
      <FormGroup>
        <Label for="name">right_answer</Label>
        <Input
          name="rightAnswer"
          onChange={formik.handleChange}
          value={formik.values.rightAnswer}
          type="textarea"
          rightAnswer="rightAnswer"
          placeholder="Правильна відповідь"
        />
      </FormGroup>
      <FormGroup>
        <Label for="name">answersList</Label>
        <Input
          name="answersList0"
          onChange={formik.handleChange}
          value={formik.values.answersList0}
          type="textarea"
          answersList="answersList"
          placeholder="Варіанти відповіді"
        />
        <br />
        <Input
          name="answersList1"
          onChange={formik.handleChange}
          value={formik.values.answersList1}
          type="textarea"
          answersList="answersList"
          placeholder="Варіанти відповіді"
        />
        <br />
        <Input
          name="answersList2"
          onChange={formik.handleChange}
          value={formik.values.answersList2}
          type="textarea"
          answersList="answersList"
          placeholder="Варіанти відповіді"
        />
        <br />
        <Input
          name="answersList3"
          onChange={formik.handleChange}
          value={formik.values.answersList3}
          type="textarea"
          answersList="answersList"
          placeholder="Варіанти відповіді"
        />
        <br />
      </FormGroup>

      <div className="form-group">
        <label>Email</label>
        <input
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          type="email"
          className="form-control"
          placeholder="Enter email"
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
