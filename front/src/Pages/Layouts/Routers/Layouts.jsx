import {
    Container,
    Nav,
    Navbar,
  } from "react-bootstrap";
  import { Link } from "react-router-dom";
  import paths from "./paths";
  import classes from "./Layouts.module.css"
  
  const Layout = ({ children }) => {
    return (
      <div>
        <Navbar bg="dark" expand="lg">
          <Container >
            <Navbar.Brand as={Link} to={paths.main} >
              <p className={classes.NavLinks}>IQ </p>
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to={paths.test}>
              <p className={classes.NavLinks}>Tests</p>
              </Nav.Link>
              <Nav.Link as={Link} to={paths.results}>
              <p className={classes.NavLinks}> Results</p>
              </Nav.Link>
              <Nav.Link as={Link} to={paths.add}>
              <p className={classes.NavLinks}> AddTest</p>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container>{children}</Container>
      </div>
    );
  };
  export default Layout;