import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useFormik } from "formik";
import { postData } from "../../../Axios/api";

const AddTest = (props) => {
  const formik = useFormik({
    initialValues: {
    question: "",
    right_answer: "",
    answers_list : "",
    password: "",
    email: "",
    },
    onSubmit: (values) => {
      postData (values);
      console.log('hi')
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <Label for="name">Name of Question</Label>
        <Input
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
          onChange={formik.handleChange}
          value={formik.values.right_answer}
          type="textarea"
          right_answer="right_answer"
          placeholder="Правильна відповідь"
        />
      </FormGroup>
      <FormGroup>
      <Label for="name">answers_list</Label>
        <Input
          onChange={formik.handleChange}
          value={formik.values.answers_list}
          type="textarea"
          answers_list="answers_list"
          placeholder="Варіанти відповіді"
        />
        <br/>
         <Input
          onChange={formik.handleChange}
          value={formik.values.answers_list}
          type="textarea"
          answers_list="answers_list"
          placeholder="Варіанти відповіді"
        />
        <br/>
         <Input
          onChange={formik.handleChange}
          value={formik.values.answers_list}
          type="textarea"
          answers_list="answers_list"
          placeholder="Варіанти відповіді"
        />
          <br/>
         <Input
          onChange={formik.handleChange}
          value={formik.values.answers_list}
          type="textarea"
          answers_list="answers_list"
          placeholder="Варіанти відповіді"
        />
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
