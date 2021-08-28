import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import paths from "../../Routers/paths";
import classes from "../styles/Layouts.module.css"

const AuthLayout = (props) => {

    return <Nav className="mr-auto">
        {props.user
            ? <Nav.Link as={Link} to={paths.profile}>
                <p className={classes.NavLinks}>{props.user.nickname} </p>
            </Nav.Link>
            : <>
                <Nav.Link as={Link} to={paths.login}>
                    <p className={classes.NavLinks}>Login</p>
                </Nav.Link>
                <Nav.Link as={Link} to={paths.register}>
                    <p className={classes.NavLinks}> Register</p>
                </Nav.Link>
            </>
        }
    </Nav>
}

export default AuthLayout;
