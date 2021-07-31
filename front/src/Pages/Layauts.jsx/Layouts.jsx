import {
    Container,
    Nav,
    Navbar,
  } from "react-bootstrap";
  import { Link } from "react-router-dom";
  import paths from "./Routers/paths";
  
  const Layout = ({ children, logout }) => {
    return (
      <div>
        <Navbar bg="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to={paths.main}>
              IQ
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to={paths.test}>
              Tests
              </Nav.Link>
              <Nav.Link as={Link} to={paths.result}>
                Results
              </Nav.Link>
              <Nav.Link as={Link} to={paths.add}>
                AddTest
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container>{children}</Container>
      </div>
    );
  };
  export default Layout;