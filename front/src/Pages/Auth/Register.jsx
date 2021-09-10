import { useState } from "react";
import { useFormik } from "formik";
import { Button, Form, Input } from "reactstrap";
import classes from "./Auth.module.css"
import { registerAPI } from "../../Axios/api"
import { Redirect } from "react-router-dom";

const Register = (props) => {

    const [submited, setSubmited] = useState(false);

    const register = async (data) => {
        await registerAPI(data).then((res) => {
            if (res.data.err) {
                console.log(res.data.err)
            } else if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                props.me(res.data.token)
            }
        })
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            age: 0,
            nickname: "",
        },
        onSubmit: (values) => {
            register({
                email: values.email,
                password: values.password,
                age: values.age,
                nickname: values.nickname
            }).then(() => {
                setSubmited(true)
            })
        },
    });

    return <Form onSubmit={formik.handleSubmit} className={classes.loginForm}>
        {submited && <Redirect to="main" />}
        <Input
            name="nickname"
            onChange={formik.handleChange}
            value={formik.values.nickname}
            type="text"
            placeholder="Nickname"
            className={classes.LoginInput}
        />
        <Input
            name="age"
            onChange={formik.handleChange}
            value={formik.values.age}
            type="number"
            placeholder="Age"
            className={classes.LoginInput}
        />
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
        <Button className={classes.LoginButton}>Submit</Button>
    </Form>;
};

export default Register;
