import { Button, Container, Navbar, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import './App.css';
import { Cell, Engine } from './services/engine';
import { Cell, Engine, newGrid } from './services/engine';
import { GridRowStyled, GridStyled } from './components/styles';
import { GridCell } from './components/grid-cell';

export const colors = {
  StarCommandBlue: '#2274a5',
  KeyLime: '#e7eb90',
  NaplesYellow: '#fadf63',
  Goldenrod: '#e6af2e',
  Wine: '#632b30',
  OldBurgundy: '#4f3130',
  Catawba: '#753742',
  cellNeutral: '#FFF3DE',
  startCell: '#34c2b1',
  goalCell: '#b5f5b3',
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
    let ng = [...gridState];

    // remove start and goal cells
    if (startCell && goalCell) {
      // remove previous start cell
      ng[startCell.x][startCell.y].status = ' ';
      ng[startCell.x][startCell.y].bgColor = colors.cellNeutral;

      // remove previous goal cell
      ng[goalCell.x][goalCell.y].status = ' ';
      ng[goalCell.x][goalCell.y].bgColor = colors.cellNeutral;
      setStartCell(null);
      setGoalCell(null);
      setGridState(ng);

      return;
    }

    if (!startCell) {
      // mark new start cell
      ng[cell.x][cell.y].status = 'Start';
      ng[cell.x][cell.y].bgColor = colors.startCell;

      setStartCell(ng[cell.x][cell.y]);
    } else {
      // mark new goal cell
      ng[cell.x][cell.y].status = 'Goal';
      ng[cell.x][cell.y].bgColor = colors.goalCell;
      setGoalCell(ng[cell.x][cell.y]);
    }

    setGridState(ng);
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
            {gridState &&
              gridState.map((row, rIndex) => (
                <GridRowStyled key={rIndex}>
                  {row &&
                    row.map((cell, cIndex) => (
                      <GridCell
                        onClick={() => {
                          handleCellClick(cell);
                        }}
                        cell={cell}
                        key={rIndex + '-' + cIndex}
                      ></GridCell>
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
