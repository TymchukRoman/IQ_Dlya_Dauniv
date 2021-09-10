import { useFormik } from "formik";
import { Button, Form, Input } from "reactstrap";
import classes from "./Auth.module.css"
import { loginAPI } from "../../Axios/api"
import { useState } from "react";
import { Redirect } from "react-router-dom";

const Login = (props) => {

    const [errors, setErrors] = useState("");
    const [submited, setSubmited] = useState(false);

    const login = async (data) => {
        let token
        await loginAPI(data).then((res) => {
            if (res.data.err) {
                setErrors([ ...res.data.err ])
            } else {
                token = res.data.token
                setErrors("")
            }
        })
        localStorage.setItem('token', token);
        props.me(token)
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            login({
                email: values.email,
                password: values.password
            }).then(() => {
                setSubmited(true)
            })
        },
    });

    return <Form onSubmit={formik.handleSubmit} className={classes.loginForm}>
        {submited && <Redirect to="main" />}
        <Input
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            placeholder="Email"
            className={classes.LoginInput}
        />
        <Input
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            placeholder="Password"
            className={classes.LoginInput}
        />
        <div className={classes.errorsLogin}>
            {errors}
        </div>
        <Button type="submit" className={classes.LoginButton}>Submit</Button>
    </Form>;

};

export default Login;
