import { Button, Card, Col, Container, Navbar, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Cell, Engine } from './services/engine';
import { useEffect, useState } from 'react';
import { PrettyGrid } from './components/pretty-grid';
import { GridCellStyled, GridRowStyled, GridStyled } from './components/styles';

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
  let [gridState, setGridState] = useState<Cell[][]>([]);
  const engine = new Engine(gridState, setGridState);

  // initialize game
  useEffect(() => {
    engine.resetGrid();
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

        <Row>
          <GridStyled>
            {gridState.map((row, rIndex) => (
              <GridRowStyled key={rIndex}>
                {row.map((cell, cIndex) => (
                  <GridCellStyled key={rIndex + '-' + cIndex}>
                    {cell.status}
                  </GridCellStyled>
                ))}
              </GridRowStyled>
            ))}
          </GridStyled>
        </Row>

        <Row>
          <div
            style={{
              margin: '1rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              className="controls"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Button onClick={() => engine.takeStep()}>Take Step</Button>
              <Button
                onClick={() => engine.computeAllPaths()}
                variant="success"
              >
                Compute all paths
              </Button>
              <Button onClick={() => engine.resetGrid()} variant="danger">
                Reset
              </Button>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default App;
