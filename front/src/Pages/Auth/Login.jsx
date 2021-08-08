import { useFormik } from "formik";
import { Button, Form, Input } from "reactstrap";
import classes from "./Auth.module.css"
import { loginAPI } from "../../Axios/api"
import { useState } from "react";

const Login = (props) => {

    const [errors, setErrors] = useState("")

    const login = async (data) => {
        let token
        await loginAPI(data).then((res) => {
            if (res.data.token) {
                token = res.data.token
                setErrors("")
            } else {
                setErrors(res.data)
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
            })
        },
    });

    return <Form onSubmit={formik.handleSubmit} className={classes.loginForm}>
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
