import { Container, Navbar } from 'react-bootstrap';

export const TopNavbar = props => {
  return (
    <Navbar bg="dark" variant="dark" style={{ marginBottom: '1rem' }}>
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          A* Star
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
