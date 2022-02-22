import { Button, Container, Navbar, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import './App.css';
import { Cell, Engine } from './services/engine';
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
  let [frontierState, setFrontierState] = useState<Cell[]>([]);
  let [cameFromState, setCameFromState] = useState<{ [key: string]: Cell }>({});

  const engine = new Engine(
    gridState,
    setGridState,
    frontierState,
    setFrontierState,
    cameFromState,
    setCameFromState
  );

  // initialize grid
  useEffect(() => {
    engine.resetGrid();
  }, []);

  const handleCellClick = cell => {
    console.log('cell click', cell);
    let ng = [...gridState];
    ng[engine.startCell.x][engine.startCell.y].status = ' ';
    ng[engine.startCell.x][engine.startCell.y].bgColor = 'yellow';

    setGridState(ng);

    let startCell = { ...cell, bgColor: 'red', status: 'S' };
    engine.startCell = startCell;
    engine.putStart(startCell);
  };

  return (
    <div className="App" style={{ backgroundColor: colors.NaplesYellow }}>
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
                  <GridCellStyled
                    onClick={() => {
                      handleCellClick(cell);
                    }}
                    key={rIndex + '-' + cIndex}
                    bgColor={cell.bgColor}
                  >
                    <div>
                      <p>
                        {cell.x} - {cell.y}
                      </p>
                      <p>
                        <b>{cell.status}</b>
                      </p>
                      <p>{cell.cameFrom}</p>
                    </div>
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
