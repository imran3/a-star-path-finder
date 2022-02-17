export interface Cell {
  x: number;
  y: number;
  status: string;
  bgColor: string;
  cameFrom?: string;
}

const rows = 3;
const cols = 4;

export class Engine {
  grid: Cell[][];

  gridState;
  setGridState;
  frontierState;
  setFrontierState;
  cameFromState;
  setCameFromState;

  frontier: Cell[];
  came_from;

  startCell: Cell = {
    x: 2,
    y: 0,
    status: 'S',
    bgColor: 'red',
  };

  goalCell: Cell = {
    x: 0,
    y: 1,
    status: 'G',
    bgColor: ' green',
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
    this.frontier = [];
    this.came_from = {};

    this.gridState = gridState;
    this.setGridState = setGridState;
    this.frontierState = frontierState;
    this.setFrontierState = setFrontierState;
    this.cameFromState = cameFromState;
    this.setCameFromState = setCameFromState;
  }

  resetGrid = (): void => {
    // optional: randomize start and goal locations
    this.randomizeStartAndGoal();

    // get clean grid
    const newGrid = this.newGrid();
    this.grid = newGrid;

    // delete previous paths
    this.setFrontierState([]);
    this.setCameFromState({});

    // put start and goal cells
    this.putStart(this.startCell);
    this.updateGridCell(this.goalCell);

    this.setGridState(this.grid);
  };

  randomizeStartAndGoal() {
    // put start cell (random location on grid)
    this.startCell.x = Math.floor(Math.random() * rows);
    this.startCell.y = Math.floor(Math.random() * cols);

    // put goal cell (random location on grid)
    this.goalCell.x = Math.floor(Math.random() * rows);
    this.goalCell.y = Math.floor(Math.random() * cols);
  }

  newGrid = (): Cell[][] => {
    let grid: Cell[][] = [];

    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < cols; j++) {
        grid[i][j] = {
          status: ' ',
          x: i,
          y: j,
          bgColor: 'yellow',
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

  updateGridCellBgColor = (x, y, color): void => {
    let newGrid = [...this.grid];
    newGrid[x][y].bgColor = color;

    this.setGridState(newGrid);
  };

  putStart = (startCell: Cell) => {
    this.frontier = [startCell];
    this.came_from[startCell.x + '-' + startCell.y] = null;

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

    // this.setFrontierState(this.frontier);
    this.setCameFromState(this.came_from);

    if (this.frontier.length <= 0) {
      console.log('Frontier empty');

      //this.came_from[this.startCell.x + '-' + this.startCell.y] =
      //this.startCell;
      this.came_from[this.goalCell.x + '-' + this.goalCell.y].status =
        this.goalCell.status;

      let pathGrid = this.newGrid();

      let pathCells = this.getPath(this.startCell, this.goalCell);
      pathCells.forEach(cell => {
        pathGrid[cell.x][cell.y] = cell;
      });

      // add coordinate of origin cell
      for (const [key, value] of Object.entries(this.came_from)) {
        let [x, y] = key.split('-');
        if (value) {
          pathGrid[x][y].cameFrom = value['x'] + '-' + value['y'];
        }
      }

      this.setGridState(pathGrid);
    }
  }

  takeStep(): void {
    let current = this.frontier[0]; // pull unexplored cell from frontier (open list)
    this.frontier.shift(); // remove currently explored cell from open list

    current.bgColor = 'blue';
    this.updateGridCellBgColor(current.x, current.y, 'blue');

    if (current.x === this.startCell.x && current.y === this.startCell.y) {
      console.log('exploring start cell');
      this.updateGridCellBgColor(this.startCell.x, this.startCell.y, 'red');
    }

    if (current) {
      let currentNeighbors = this.cellNeighbors(current);

      currentNeighbors.forEach(neighborgCell => {
        if (neighborgCell.x + '-' + neighborgCell.y in this.came_from) {
          console.log('cell already explored (in came_from)');
        } else {
          console.log('exploring new cell: came_from', this.came_from);
          this.frontier.push(neighborgCell);

          this.updateGridCellBgColor(neighborgCell.x, neighborgCell.y, 'blue');

          this.came_from[neighborgCell.x + '-' + neighborgCell.y] = current;
        }
      });
    }
  }

  getPath(startCell: Cell, goalCell: Cell): Cell[] {
    let current = goalCell;
    let path: Cell[] = [];

    let x = 0;
    while (current && x < 100) {
      console.log('current', current);
      current.bgColor = 'pink';
      path.push(current);
      current = this.came_from[current.x + '-' + current.y];

      x++;
    }

    if (x === 100) {
      console.log('stopped infin loop getPath()');
    }

    return path;
  }

  cellNeighbors(cell: Cell): Cell[] {
    let nCells: Cell[] = [];
    const ngCellIndexes = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    ngCellIndexes.forEach(([nx, ny]) => {
      let neighborgX = cell.x + nx;
      let neighborgY = cell.y + ny;

      if (
        neighborgX >= 0 &&
        neighborgX < rows &&
        neighborgY >= 0 &&
        neighborgY < cols
      ) {
        if (
          this.grid[neighborgX][neighborgY].status !== 'S' &&
          this.grid[neighborgX][neighborgY].status !== 'G'
        ) {
          this.grid[neighborgX][neighborgY].status = 'R';
        }
        nCells.push(this.grid[neighborgX][neighborgY]);
      }
    });

    return nCells;
  }

  distance = (a: Cell, b: Cell): number => {
    return Math.abs(a.x - b.x + (a.y - b.y));
  };
}
