import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import {paths} from "../Routers/paths";
import AuthLayout from "./Auth/AuthLayout";
import classes from "./styles/Layouts.module.css"

const NavigationBar = (props) => {
  return (
    <Navbar bg="dark" expand='md'>
      <Container >
        <Navbar.Brand as={Link} to={paths.main} >
          <p className={classes.NavLinks}>IQ </p>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={paths.test}>
            <p className={classes.NavLinks}>Tests</p>
          </Nav.Link>
          <Nav.Link as={Link} to={paths.leaderboards}>
            <p className={classes.NavLinks}> Leaderboards</p>
          </Nav.Link>
          <Nav.Link as={Link} to={paths.add}>
            <p className={classes.NavLinks}> AddTest</p>
          </Nav.Link>
        </Nav>
          <AuthLayout user={props.user} me={props.me}/>
      </Container>
    </Navbar>
  );
};
export default NavigationBar;