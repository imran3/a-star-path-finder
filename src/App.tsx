import { Button, Container, Navbar, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import './App.css';
import { computeAllPaths, computePathGrid, newGrid } from './services/engine';
import { GridRowStyled, GridStyled } from './components/styles';
import { GridCell } from './components/grid-cell';
import { Cell, Dictionary } from './models/cell';

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
  pathCell: '#caf0f8',
};

export const App = () => {
  // push down one level to be in Grid component rather than here
  let [gridState, setGridState] = useState<Cell[][]>();
  let [pathGrid, setPathGrid] = useState<Cell[][]>();
  let [startCell, setStartCell] = useState<Cell>();
  let [goalCell, setGoalCell] = useState<Cell>();
  let [cameFromState, setCameFromState] = useState<Dictionary>({});

  // remove setters, instead return new state

  useEffect(() => {
    let ng = newGrid();
    setGridState(ng);
  }, []);

  useEffect(() => {
    // compute path when goal set
    if (startCell && goalCell) {
      if (goalCell.x === startCell.x && goalCell.y === startCell.y) {
        console.log('goal is same as start cell.');
        return;
      }

      handleComputePathClick();
    }
  }, [goalCell, startCell]);

  const handleCellClick = (cell: Cell) => {
    let ng = [...gridState];

    // remove start and goal cells
    if (startCell && goalCell) {
      reset();
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

  const reset = () => {
    setGridState(newGrid());
    setStartCell(null);
    setGoalCell(null);
  };

  const handleComputePathClick = () => {
    let cameFrom: Dictionary = computeAllPaths(gridState, startCell);
    setCameFromState(cameFrom);

    let computedPathGrid = computePathGrid(cameFrom, goalCell);
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
            <h3>
              {' '}
              <Row>
                {!startCell ? (
                  <p>Click on START CELL</p>
                ) : !goalCell ? (
                  <p>Click to set GOAL CELL</p>
                ) : (
                  <p> Click a cell to clear START and GOAL.</p>
                )}
              </Row>
            </h3>
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
              {/* <Button onClick={() => engine.takeStep()}>Take Step</Button> */}
              <Button
                onClick={e => {
                  e.preventDefault();
                  handleComputePathClick();
                }}
                disabled={!startCell || !goalCell}
                variant="success"
              >
                Compute all paths
              </Button>
              <Button
                onClick={e => {
                  e.preventDefault();
                  reset();
                }}
                variant="danger"
              >
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
