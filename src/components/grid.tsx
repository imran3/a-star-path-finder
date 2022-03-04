import { useEffect, useState } from 'react';

import { colors } from '../constants';
import { Cell, Dictionary } from '../models/cell';
import { Controls } from './controls';
import { GridCell } from './grid-cell';
import { Instructions } from './instructions';
import { GridRowStyled, GridStyled } from './styles';
import { computeAllPaths, computePathGrid, newGrid } from '../services/engine';

export const Grid = () => {
  // push down one level to be in Grid component rather than here
  let [gridState, setGridState] = useState<Cell[][]>();
  let [startCell, setStartCell] = useState<Cell>();
  let [goalCell, setGoalCell] = useState<Cell>();
  let [pathGrid, setPathGrid] = useState<Cell[][]>();
  let [cameFromState, setCameFromState] = useState<Dictionary>({});

  useEffect(() => {
    let ng = newGrid();
    setGridState(ng);
  }, []);

  // compute path when goal set
  useEffect(() => {
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
      setGridState(ng);
    } else {
      // mark new goal cell
      ng[cell.x][cell.y].status = 'Goal';
      ng[cell.x][cell.y].bgColor = colors.goalCell;
      setGoalCell(ng[cell.x][cell.y]);
      setGridState(ng);
    }
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
    setPathGrid(computedPathGrid);
    setGridState(computedPathGrid);
  };

  return (
    <>
      <Instructions startCell={startCell} goalCell={goalCell}></Instructions>
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
                    startCell={startCell}
                    goalCell={goalCell}
                    key={rIndex + '-' + cIndex}
                  ></GridCell>
                ))}
            </GridRowStyled>
          ))}
      </GridStyled>
      <Controls onResetClickHandler={reset}></Controls>
    </>
  );
};
