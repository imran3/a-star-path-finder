export interface Cell {
  x: number;
  y: number;
  status: string;
}

const rows = 5;
const cols = 5;

export class Engine {
  grid: Cell[][];

  frontier: Cell[]; // acting as queue (push=enque, shift= deque)
  came_from: { [key: string]: Cell };

  startCell: Cell = {
    x: 2,
    y: 2,
    status: 'S',
  };

  goalCell: Cell = {
    x: 0,
    y: cols - 1,
    status: 'G',
  };

  constructor() {
    this.grid = [];
    this.frontier = [];
    this.came_from = {};
  }

  resetGrid = (): void => {
    // get clean grid
    const newGrid = this.newGrid();
    this.grid = newGrid;

    // delete previous paths
    this.frontier = [];
    this.came_from = {};

    // put start cell
    this.startCell.x = Math.floor(Math.random() * rows);
    this.startCell.y = Math.floor(Math.random() * cols);
    this.putStart(this.startCell);

    // put goal cell
    this.goalCell.x = Math.floor(Math.random() * rows);
    this.goalCell.y = Math.floor(Math.random() * cols);
    this.updateGridCell(this.goalCell);

    console.log('grid reset');
    this.printGrid();
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
    this.grid[cell.x][cell.y] = cell;
  };

  putStart = (startCell: Cell) => {
    this.frontier.push(startCell);
    this.came_from[startCell.x + '-' + startCell.y] = null;

    this.updateGridCell(startCell);
  };

  computeAllPaths() {
    while (this.frontier.length > 0) {
      // early exit: stop computing paths as soon as goal cells become next to deque
      //if (this.frontier[0] === this.goalCell) return;

      this.takeStep();
    }

    if (this.frontier.length <= 0) {
      console.log('frontier empty');

      let pathGrid = this.newGrid();
      let pathCells = this.getPath(this.startCell, this.goalCell);

      pathCells.forEach(cell => {
        pathGrid[cell.x][cell.y].status = 'G';
      });

      this.printGrid(pathGrid);
    }
  }

  takeStep(): void {
    let current = this.frontier[0];
    this.frontier.shift();

    if (current) {
      let currentNeigbors = this.cellNeighbours(current);

      currentNeigbors.forEach(neighborgCell => {
        if (!this.came_from[neighborgCell.x + '-' + neighborgCell.y]) {
          this.frontier.push(neighborgCell);
          this.came_from[neighborgCell.x + '-' + neighborgCell.y] = current;
        }
      });

      this.printGrid();
    }
  }

  getPath(startCell: Cell, goalCell: Cell): Cell[] {
    let current = goalCell;
    let path: Cell[] = [];

    while (current != startCell) {
      path.push(current);
      current = this.came_from[current.x + '-' + current.y];
    }

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
    let pgrid = '';
    for (let i = 0; i < rows; i++) {
      pgrid += '\n';
      for (let j = 0; j < cols; j++) {
        pgrid += grid[i][j].status + ' | ';
      }
    }

    console.log(pgrid);
  }
}
