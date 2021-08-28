import { useFormik } from "formik";
import { Button, Form, Input } from "reactstrap";
import classes from "./Auth.module.css"
import { registerAPI } from "../../Axios/api"

const Register = (props) => {

    const register = async (data) => {
        await registerAPI(data).then((res) => {
            if(res.data.err){
                console.log(res.data.err)
            } else if(res.data.token) {
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
            })
        },
    });

    return <Form onSubmit={formik.handleSubmit} className={classes.loginForm}>
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
