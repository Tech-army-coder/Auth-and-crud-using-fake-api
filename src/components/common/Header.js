import { Link, NavLink } from "react-router-dom";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

function Header({ logout, isLoggedIn }) {
  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="py-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Tech Coder
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto" navbarScroll>
            {isLoggedIn ? (
              <>
              <Nav.Link as={NavLink} to="/employees-data">
                Employees Data
              </Nav.Link>
              <Nav.Link as={NavLink} to="/dashboard">
                My Profile
              </Nav.Link>
              </>

            ) : (
              <>
                <Nav.Link as={NavLink} to="/home">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/features">
                  Features
                </Nav.Link>
                <Nav.Link as={NavLink} to="/about">
                  About
                </Nav.Link>
                <Nav.Link as={NavLink} to="/contact">
                  Contact
                </Nav.Link>
                <NavDropdown title="More" id="navbarScrollingDropdown">
                  <NavDropdown.Item as={NavLink} to="/action1">
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/action2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/something-else">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>

          <div className="d-flex align-items-center gap-2">
            {isLoggedIn ? (
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline-light">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="warning">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
