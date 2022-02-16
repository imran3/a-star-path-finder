export interface Cell {
  x: number;
  y: number;
  status: string;
}

const rows = 5;
const cols = 5;

export class Engine {
  grid: Cell[][];

  gridState;
  setGridState;
  frontierState;
  setFrontierState;
  cameFromState;
  setCameFromState;

  frontier;
  came_from;

  startCell: Cell = {
    x: 0,
    y: 0,
    status: 'S',
  };

  goalCell: Cell = {
    x: rows - 1,
    y: cols - 1,
    status: 'G',
  };

  constructor(
    gridState,
    setGridState,
    frontierState,
    setFrontierState,
    cameFromState,
    setCameFromState
  ) {
    this.grid = [];
    this.gridState = gridState;
    this.setGridState = setGridState;
    this.frontierState = frontierState;
    this.setFrontierState = setFrontierState;
    this.cameFromState = cameFromState;
    this.setCameFromState = setCameFromState;
  }

  resetGrid = (): void => {
    // get clean grid
    const newGrid = this.newGrid();
    this.grid = newGrid;

    // delete previous paths
    this.setFrontierState([]);
    this.setCameFromState({});

    // put start cell
    this.startCell.x = Math.floor(Math.random() * rows);
    this.startCell.y = Math.floor(Math.random() * cols);
    this.putStart(this.startCell);

    // put goal cell
    this.goalCell.x = Math.floor(Math.random() * rows);
    this.goalCell.y = Math.floor(Math.random() * cols);
    this.updateGridCell(this.goalCell);

    this.setGridState(this.grid);
  };

  newGrid = (): Cell[][] => {
    let grid: Cell[][] = [];

    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < cols; j++) {
        grid[i][j] = {
          status: ' ',
          x: i,
          y: j,
        };
      }
    }

    return grid;
  };

  updateGridCell = (cell: Cell): void => {
    let newGrid = [...this.grid];
    newGrid[cell.x][cell.y] = cell;

    this.setGridState(newGrid);
  };

  putStart = (startCell: Cell) => {
    // this.frontier.push(startCell);
    // this.came_from[startCell.x + '-' + startCell.y] = null;

    this.setFrontierState([startCell]);

    let initCameFrom = {};
    initCameFrom[startCell.x + '-' + startCell.y] = null;
    this.setCameFromState(initCameFrom);

    this.updateGridCell(startCell);
  };

  computeAllPaths() {
    this.frontier = [...this.frontierState];
    this.came_from = { ...this.cameFromState };
    this.grid = [...this.gridState];

    let x = 0;
    while (this.frontier.length > 0 && x < 1000) {
      // early exit: stop computing paths as soon as goal cells become next to deque
      //if (this.frontier[0] === this.goalCell) return;

      this.takeStep();
      x++;
    }

    if (x === 1000) {
      console.log('stopped infin loop computeAllPaths()');
    }

    // // this.setFrontierState(this.frontier);
    this.setCameFromState(this.came_from);

    if (this.frontier.length <= 0) {
      console.log('Frontier empty');

      this.came_from[this.startCell.x + '-' + this.startCell.y].status = 'S';
      this.came_from[this.goalCell.x + '-' + this.goalCell.y].status = 'G';

      console.log('came from', this.came_from);
      let pathGrid = this.newGrid();
      let pathCells = this.getPath(this.startCell, this.goalCell);

      pathCells.forEach(cell => {
        pathGrid[cell.x][cell.y].status = 'G';
      });

      console.log('pathCells', pathCells);
      console.log('pathGrid', pathGrid);
      this.setGridState(pathGrid);
      this.printGrid(pathGrid);
    }
  }

  takeStep(): void {
    // let current = this.frontierState[0];
    // let shiftedState = [...this.frontierState];

    // shiftedState.shift();

    // this.setFrontierState(shiftedState);

    let current = this.frontier[0];
    this.frontier.shift();

    // console.log(this.frontierState, shiftedState);
    if (current) {
      let currentNeigbors = this.cellNeighbours(current);

      currentNeigbors.forEach(neighborgCell => {
        if (!this.came_from[neighborgCell.x + '-' + neighborgCell.y]) {
          this.frontier.push(neighborgCell);
          this.came_from[neighborgCell.x + '-' + neighborgCell.y] = current;
          // this.setFrontierState([...shiftedState, neighborgCell]);

          // let newCameFrom = { ...this.cameFromState };
          // newCameFrom[this.startCell.x + '-' + this.startCell.y] = current;
          // this.setCameFromState(newCameFrom);
        }
      });
    }
  }

  getPath(startCell: Cell, goalCell: Cell): Cell[] {
    let current = goalCell;
    let path: Cell[] = [];

    let x = 0;
    while (current.status !== startCell.status && x < 100) {
      path.push(current);
      current = this.came_from[current.x + '-' + current.y];
      console.log('C', current.x, current.y);

      x++;
    }

    if (x === 100) {
      console.log('stopped infin loop getPath()');
    }
    path.push(current);
    path.push(this.startCell);

    return path;
  }

  cellNeighbours(cell: Cell): Cell[] {
    let nCells: Cell[] = [];
    const ngCellIndexs = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    ngCellIndexs.forEach(([nx, ny]) => {
      let neighborgX = cell.x + nx;
      let neighborgY = cell.y + ny;

      if (
        neighborgX >= 0 &&
        neighborgX < rows &&
        neighborgY >= 0 &&
        neighborgY < cols
      ) {
        this.grid[neighborgX][neighborgY].status = 'R';
        nCells.push(this.grid[neighborgX][neighborgY]);
      }
    });

    return nCells;
  }

  distance = (a: Cell, b: Cell): number => {
    return Math.abs(a.x - b.x + (a.y - b.y));
  };

  printGrid(grid = this.grid) {
    return;
    // let pgrid = '';
    // for (let i = 0; i < rows; i++) {
    //   pgrid += '\n';
    //   for (let j = 0; j < cols; j++) {
    //     pgrid += grid[i][j].status + ' | ';
    //   }
    // }

    // console.log(this.gridState);
  }
}
