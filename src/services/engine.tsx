import { colors } from '../constants';
import { Cell, Dictionary } from '../models/cell';

const rows = 10;
const cols = 10;

export const newGrid = (): Cell[][] => {
  let grid: Cell[][] = [];

  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = {
        status: ' ',
        x: i,
        y: j,
        bgColor: colors.cellNeutral,
      };
    }
  }

  return grid;
};

export const computeAllPaths = (grid: Cell[][], startCell: Cell) => {
  let frontier: Cell[] = [startCell];

  let cameFrom = {};
  cameFrom[startCell.x + '-' + startCell.y] = null;

  let x = 0;
  while (frontier.length > 0 && x < 1000) {
    // early exit: stop computing paths as soon as goal cells become next to deque
    //if (this.frontier[0] === this.goalCell) return;

    takeStep(grid, frontier, cameFrom);
    x++;
  }
  return cameFrom;
};

export const takeStep = (
  grid: Cell[][],
  frontier: Cell[],
  cameFrom: Dictionary
): void => {
  let current = frontier[0]; // pull unexplored cell from frontier (open list)
  frontier.shift(); // remove currently explored cell from open list

  if (current) {
    let currentNeighbors = cellNeighbors(grid, current);

    currentNeighbors.forEach(neighborgCell => {
      // cell already explored (in cameFrom map)? skip
      if (neighborgCell.x + '-' + neighborgCell.y in cameFrom) return;

      frontier.push(neighborgCell);
      cameFrom[neighborgCell.x + '-' + neighborgCell.y] = current;
    });
  }
};

export const cellNeighbors = (grid: Cell[][], cell: Cell): Cell[] => {
  let nCells: Cell[] = [];
  let ngCellIndexes: number[][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const diagonalCellIndexes: number[][] = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  // un-comment to enable diagonal steps
  //ngCellIndexes = ngCellIndexes.concat(diagonalCellIndexes);

  ngCellIndexes.forEach(([nx, ny]) => {
    let neighborgX = cell.x + nx;
    let neighborgY = cell.y + ny;

    if (
      neighborgX >= 0 &&
      neighborgX < rows &&
      neighborgY >= 0 &&
      neighborgY < cols
    ) {
      nCells.push(grid[neighborgX][neighborgY]);
    }
  });

  return nCells;
};

export const computePathGrid = (
  cameFrom: Dictionary,
  goalCell: Cell
): Cell[][] => {
  let pathGrid: Cell[][] = newGrid();

  let pathCells = getPath(cameFrom, goalCell);
  pathCells.forEach(cell => {
    pathGrid[cell.x][cell.y] = cell;
  });

  // add coordinate of origin cell
  for (const [key, value] of Object.entries(cameFrom)) {
    let [x, y] = key.split('-');
    if (pathGrid[x][y].status === 'P') {
      pathGrid[x][y].cameFrom = value['x'] + '-' + value['y'];
    }
  }
  return pathGrid;
};

export const getPath = (cameFrom: Dictionary, goalCell: Cell): Cell[] => {
  let current = goalCell;
  let path: Cell[] = [];

  while (current) {
    let pc = {
      ...current,
      bgColor: colors.pathCell,
      status: 'P',
    };

    path.push(pc);
    current = cameFrom[current.x + '-' + current.y];
  }

  // set start and goal cells status and bgColor
  path[path.length - 1] = {
    ...path[path.length - 1],
    bgColor: colors.startCell,
    status: 'S',
  };
  path[0] = { ...path[0], bgColor: colors.goalCell, status: goalCell.status };

  return path;
};

export const distance = (a: Cell, b: Cell): number => {
  return Math.abs(a.x - b.x + (a.y - b.y));
};
