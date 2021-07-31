import {
    Container,
    Nav,
    Navbar,
  } from "react-bootstrap";
  import { Link } from "react-router-dom";
  import paths from "./paths";
  
  const Layout = ({ children }) => {
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
              <Nav.Link as={Link} to={paths.results}>
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