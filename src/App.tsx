import { Button, Card, Col, Container, Navbar, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Engine } from './services/engine';
import { useEffect, useState } from 'react';
import { PrettyGrid } from './components/pretty-grid';

const colors = {
  StarCommandBlue: '#2274a5',
  KeyLime: '#e7eb90',
  NaplesYellow: '#fadf63',
  Goldenrod: '#e6af2e',
  Wine: '#632b30',
  OldBurgundy: '#4f3130',
  Catawba: '#753742',
};

export const App = () => {
  let [grid, setGrid] = useState([]);
  const engine = new Engine();

  // initialize game
  useEffect(() => {
    engine.resetGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App" style={{ backgroundColor: colors.StarCommandBlue }}>
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
      <Container>
        <Row>
          <header className="App-header">
            <h1 className="title">A* Star: a path finder algorithm</h1>
          </header>
        </Row>
        <div
          style={{
            margin: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <PrettyGrid grid={grid}></PrettyGrid>

          <div
            className="controls"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Button onClick={() => engine.takeStep()}>Take Step</Button>
            <Button onClick={() => engine.computeAllPaths()} variant="success">
              Compute all paths
            </Button>
            <Button onClick={() => engine.resetGrid()} variant="danger">
              Reset
            </Button>
          </div>
        </div>

        <Row>
          <Col>
            <Card>
              <Card.Header>Quote</Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>
                    {' '}
                    “We can only see a short distance ahead, but we can see
                    plenty there that needs to be done.”{' '}
                  </p>
                  <footer className="blockquote-footer">
                    <a href="https://www.goodreads.com/author/show/87041.Alan_Turing">
                      Alan Turing
                    </a>{' '}
                    in{' '}
                    <cite title="Source Title">
                      <a href="https://www.goodreads.com/work/quotes/24738161-computing-machinery-and-intelligence">
                        Computing machinery and intelligence
                      </a>
                    </cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
