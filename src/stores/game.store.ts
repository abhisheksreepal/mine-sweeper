import {
  CELL_POSITION,
  CellInterface,
  DIFFICULY_LEVEL,
} from "../interfaces/common.interface";
import { getKeyByValue } from "../util";
import RootStore from "./root.store";
import { makeAutoObservable, runInAction, toJS } from "mobx";

export class GameStore {
  private rootStore: RootStore;
  private gameStoreInstance: GameStore | null = null;
  durationCounter: number = 0; // counter in seconds
  rows: number = 1; // Setting to minimum value. Can be used as default values
  column: number = 1; // Setting to minimum value. Can be used as default values
  noOfMines: number = 1; /* noofMines should be less or equal to rows*col, else show Error 
  and disable this when difficulty level is chosen, so we can custom decide noOfMines on difficluty level */

  counterForNoOfMinesWhenFlagged = 1;

  interval: NodeJS.Timeout | null = null;

  showCellInformation = false;

  gameNumber = 0;
  get score() {
    const status = this.didUserWin;
    if (status) {
      return Math.floor(
        (this.noOfMines /
          (this.rows * this.column * (this.durationCounter || 1))) *
          1000
      );
    } else {
      return 0;
    }
  }
  __score = 0;
  set score(value) {
    this.__score = value;
  }

  startDurationCounter() {
    if (this.isGameStarted) {
      this.interval = setInterval(() => {
        runInAction(() => {
          this.setDurationCounter();
        });
      }, 1000);
    } else {
      if (this.interval) {
        clearInterval(this.interval);
      }
    }
  }

  setDurationCounter() {
    ++this.durationCounter;
  }

  data: CellInterface[][] =
    []; /* This is a matrix table which contains game data . if row=2, col=2 Then data 
                For e.g [
                    [{isMinePresent: false,isAlreadyClicked: true , isFlagged: false},{isMinePresent: true,isAlreadyClicked: false, isFlagged: false}],
                    [{isMinePresent: false,isAlreadyClicked: false, isFlagged: false},{isMinePresent: true,isAlreadyClicked: false, isFlagged: false} ]
                        ]  **/

  isGameStarted = false;

  get isGameOver() {
    const gameover =
      this.didUserFoundMine || this.areAllCellsWithoutMineClicked;
    if (gameover) {
      this.isGameStarted = false;
      this.startDurationCounter(); // This should stop duration Counter
      this.rootStore.historyStore.historyData.push({
        score: this.score,
        gameNumber: this.gameNumber,
        level: this.convertDifficultyLevel(this.difficultyLevel) ?? "NONE",
      });
    }
    return gameover;
  }

  convertDifficultyLevel(level: number): string | null {
    return getKeyByValue(DIFFICULY_LEVEL, level);
  }

  didUserFoundMine = false;

  get didUserWin() {
    const status = !this.didUserFoundMine && this.areAllCellsWithoutMineClicked;
    return status;
  }

  difficultyLevel: DIFFICULY_LEVEL = DIFFICULY_LEVEL.EASY;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    if (!this.gameStoreInstance) {
      this.gameStoreInstance = this;
      makeAutoObservable(this);
    }
    return this.gameStoreInstance;
  }

  get areAllCellsWithoutMineClicked(): boolean {
    if (this.data.length === 0) {
      return false;
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.column; j++) {
        console.log(JSON.stringify(this.data));
        if (
          !this.data[i][j].isAlreadyClicked &&
          !this.data[i][j].isMinePresent
        ) {
          return false;
        }
      }
    }

    return true;
  }

  private __noOfMines = 1; // Internal variable just to track when populating mines
  populateMines(): void {
    ++this.gameNumber;
    this.isGameStarted = true;

    this.rootStore.uiStore.showGameView = true;
    this.startDurationCounter();

    this.setNoOfMinesBasedOnDifficulty(this.difficultyLevel, this.noOfMines);
    this.__noOfMines = this.noOfMines;
    this.counterForNoOfMinesWhenFlagged = this.noOfMines;

    let counter = 0;
    for (let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < this.column; j++) {
        this.data[i][j] = {
          isMinePresent: this.randomizeMine(this.rows * this.column - counter),

          isAlreadyClicked: false,
          isFlagged: false,
        };
        ++counter;
      }
    }
  }

  private randomizeMine(remainingCells: number): boolean {
    const addMine = Math.random() < 0.5 ? true : false;
    if (this.__noOfMines < 1) {
      return false;
    }
    if (this.__noOfMines < remainingCells) {
      if (addMine) {
        --this.__noOfMines;
      }
      return addMine;
    } else if (this.__noOfMines === remainingCells) {
      --this.__noOfMines;
      return true;
    }
    return addMine;
  }

  private setNoOfMinesBasedOnDifficulty(
    difficultyLevel: DIFFICULY_LEVEL,
    noOfMines?: number
  ) {
    switch (difficultyLevel) {
      case DIFFICULY_LEVEL.EASY: {
        this.noOfMines = Math.ceil((20 / 100) * this.rows * this.column);
        break;
      }
      case DIFFICULY_LEVEL.MEDIUM: {
        this.noOfMines = Math.ceil((50 / 100) * this.rows * this.column);
        break;
      }
      case DIFFICULY_LEVEL.HARD: {
        this.noOfMines = Math.ceil((80 / 100) * this.rows * this.column);
        break;
      }
      case DIFFICULY_LEVEL.CUSTOM: {
        this.noOfMines = noOfMines || 1;
        break;
      }
      default: {
        this.noOfMines = 1;
      }
    }
    if (this.noOfMines === this.rows * this.column) {
      --this.noOfMines;
    }
  }

  leftClickCell(rowIndex: number, colIndex: number) {
    const cell = this.data[rowIndex][colIndex];
    if (cell.isMinePresent) {
      this.didUserFoundMine = true;
    }
    if (cell.isAlreadyClicked) {
      return;
    }
    cell.isAlreadyClicked = true;
    if (cell.isFlagged) {
      ++this.counterForNoOfMinesWhenFlagged;
    }
    cell.isFlagged = false;
  }

  rightClickCell(rowIndex: number, colIndex: number) {
    const cell = this.data[rowIndex][colIndex];

    if (cell.isAlreadyClicked) {
      return;
    }
    if (cell.isFlagged) {
      ++this.counterForNoOfMinesWhenFlagged;
      cell.isFlagged = !cell.isFlagged;
    } else {
      if (this.counterForNoOfMinesWhenFlagged === 0) {
        return;
      } else {
        --this.counterForNoOfMinesWhenFlagged;
        cell.isFlagged = !cell.isFlagged;
      }
    }
  }

  resetGame() {
    this.durationCounter = 0;
    this.rows = 1;
    this.column = 1;
    this.noOfMines = 1;
    this.counterForNoOfMinesWhenFlagged = 0;
    this.__noOfMines = 1;
    this.data = [];
    this.isGameStarted = false;
    this.startDurationCounter(); // This should stop duration Counter
    this.didUserFoundMine = false;
    this.score = 0;
    this.rootStore.uiStore.showGameView = false;
  }

  isNoOfMinesValid(noOfMines: number, rows: number, column: number): boolean {
    if (noOfMines < 1 || noOfMines >= rows * column) {
      return false;
    }
    return true;
  }

  /*
  Just putting out my pattern
  To determine count, Need to find position of cell  (Exclude 1 row or 1 column below)

  MultiDimension or 1D
  a) Determine cell position
  b) Get array of adjacent cells based on position
  c) Sum the count in the array and return



  If cell resides in corner , there will be alwyas 3 cell around it 
          if top left(0,0), then adj cells will be 
                (0,1),(1.0)(1,1)
          if top right(0,col), then adj cells will be 
                (0,col-1),(1,col)(1,col-1)
          if bottom right (row,col), then adj cells will be 
                (row-1,col),(row,col-1)(row-1,col-1)

            if bottom left (row,0), then adj cells will be 
                (row,1) (row-1,0) (row-1,1)
               

    
  If cell resides in side , ther will be always 5 cells around it
  If cell reside in mid, there will be 8 cells around it

For 1 row or 1 column
   if cell reside in corner, ther will 1 cell around it
   if cell resides in center, there will be 2 cell around it


  */
  getCountOfAdjacentMines(rowIndex: number, colIndex: number): number {
    let count = 0;

    const pos = this.getPositionOfCurrentCell(rowIndex, colIndex);
    const listOfIndices = this.getListOfAdjacentCellIndices(
      rowIndex,
      colIndex,
      pos
    );
    listOfIndices.forEach((data) => {
      if (this.data[data[0]][data[1]].isMinePresent) {
        ++count;
      }
    });
    console.log(`Total adjacent mines ${count}`);
    return count;
  }

  // This method will return current position of a cell in the matrix
  private getPositionOfCurrentCell(
    rowIndex: number,
    colIndex: number
  ): CELL_POSITION {
    let position = null;
    if (this.rows === 1 || this.column === 1) {
      position = this.getPositionOfCurrentCell_1D(rowIndex, colIndex);
    } else {
      position = this.getPositionOfCurrentCell_MD(rowIndex, colIndex);
    }
    console.log(
      `Position of  (${rowIndex},${colIndex}) = ${getKeyByValue(
        CELL_POSITION,
        position
      )}`
    );
    return position;
  }

  private getPositionOfCurrentCell_1D(
    rowIndex: number,
    colIndex: number
  ): CELL_POSITION {
    if (this.rows === 1) {
      if (colIndex === 0) {
        return CELL_POSITION.LEFT_1D;
      } else if (colIndex === this.column - 1) {
        return CELL_POSITION.RIGHT_1D;
      } else {
        return CELL_POSITION.MID_ROW_1D;
      }
    } else {
      if (rowIndex === 0) {
        return CELL_POSITION.TOP_1D;
      } else if (rowIndex === this.rows - 1) {
        return CELL_POSITION.BOTTOM_1D;
      } else {
        return CELL_POSITION.MID_COL_1D;
      }
    }
  }

  private getPositionOfCurrentCell_MD(
    rowIndex: number,
    colIndex: number
  ): CELL_POSITION {
    if (rowIndex === 0 && colIndex === 0) {
      return CELL_POSITION.TOP_LEFT;
    } else if (rowIndex === this.rows - 1 && colIndex === 0) {
      return CELL_POSITION.BOTTOM_LEFT;
    } else if (rowIndex === 0 && colIndex === this.column - 1) {
      return CELL_POSITION.TOP_RIGHT;
    } else if (rowIndex === this.rows - 1 && colIndex === this.column - 1) {
      return CELL_POSITION.BOTTOM_RIGHT;
    } else if (rowIndex === 0 && colIndex < this.column - 1 && colIndex > 0) {
      return CELL_POSITION.TOP_SIDE;
    } else if (colIndex === 0 && rowIndex > 0 && rowIndex < this.rows - 1) {
      return CELL_POSITION.LEFT_SIDE;
    } else if (
      colIndex === this.column - 1 &&
      rowIndex > 0 &&
      rowIndex < this.rows - 1
    ) {
      return CELL_POSITION.RIGHT_SIDE;
    } else if (
      rowIndex === this.rows - 1 &&
      colIndex > 0 &&
      colIndex < this.column - 1
    ) {
      return CELL_POSITION.BOTTOM_SIDE;
    } else {
      return CELL_POSITION.MID;
    }
  }

  private getListOfAdjacentCellIndices(
    rowIndex: number,
    colIndex: number,
    position: CELL_POSITION
  ): number[][] {
    let list: number[][] = [];
    switch (position) {
      case CELL_POSITION.LEFT_1D: {
        list.push([rowIndex, colIndex + 1]);
        break;
      }
      case CELL_POSITION.RIGHT_1D: {
        list.push([rowIndex, colIndex - 1]);
        break;
      }
      case CELL_POSITION.MID_ROW_1D: {
        list.push([rowIndex, colIndex + 1]);
        list.push([rowIndex, colIndex - 1]);
        break;
      }
      case CELL_POSITION.TOP_1D: {
        list.push([rowIndex + 1, colIndex]);
        break;
      }
      case CELL_POSITION.MID_COL_1D: {
        list.push([rowIndex + 1, colIndex]);
        list.push([rowIndex - 1, colIndex]);
        break;
      }
      case CELL_POSITION.BOTTOM_1D: {
        list.push([rowIndex - 1, colIndex]);
        break;
      }

      case CELL_POSITION.TOP_LEFT: {
        list.push([rowIndex + 1, colIndex]);
        list.push([rowIndex + 1, colIndex + 1]);
        list.push([rowIndex, colIndex + 1]);
        break;
      }
      case CELL_POSITION.TOP_RIGHT: {
        list.push([rowIndex, colIndex - 1]);
        list.push([rowIndex + 1, colIndex]);
        list.push([rowIndex + 1, colIndex - 1]);
        break;
      }
      case CELL_POSITION.BOTTOM_LEFT: {
        list.push([rowIndex, colIndex + 1]);
        list.push([rowIndex - 1, colIndex]);
        list.push([rowIndex - 1, colIndex + 1]);
        break;
      }
      case CELL_POSITION.BOTTOM_RIGHT: {
        list.push([rowIndex - 1, colIndex]);
        list.push([rowIndex - 1, colIndex - 1]);
        list.push([rowIndex, colIndex - 1]);
        break;
      }
      case CELL_POSITION.TOP_SIDE: {
        list.push([rowIndex, colIndex + 1]);
        list.push([rowIndex, colIndex - 1]);
        list.push([rowIndex + 1, colIndex + 1]);
        list.push([rowIndex + 1, colIndex]);
        list.push([rowIndex + 1, colIndex - 1]);

        break;
      }
      case CELL_POSITION.BOTTOM_SIDE: {
        list.push([rowIndex, colIndex + 1]);
        list.push([rowIndex, colIndex - 1]);
        list.push([rowIndex - 1, colIndex + 1]);
        list.push([rowIndex - 1, colIndex]);
        list.push([rowIndex - 1, colIndex + 1]);
        break;
      }
      case CELL_POSITION.LEFT_SIDE: {
        list.push([rowIndex + 1, colIndex]);
        list.push([rowIndex - 1, colIndex]);
        list.push([rowIndex - 1, colIndex + 1]);
        list.push([rowIndex, colIndex + 1]);
        list.push([rowIndex + 1, colIndex + 1]);
        break;
      }
      case CELL_POSITION.RIGHT_SIDE: {
        list.push([rowIndex + 1, colIndex]);
        list.push([rowIndex - 1, colIndex]);
        list.push([rowIndex - 1, colIndex - 1]);
        list.push([rowIndex, colIndex - 1]);
        list.push([rowIndex + 1, colIndex - 1]);
        break;
      }
      case CELL_POSITION.MID: {
        list.push([rowIndex, colIndex + 1]);
        list.push([rowIndex, colIndex - 1]);
        list.push([rowIndex + 1, colIndex]);
        list.push([rowIndex - 1, colIndex]);
        list.push([rowIndex + 1, colIndex + 1]);
        list.push([rowIndex + 1, colIndex - 1]);
        list.push([rowIndex - 1, colIndex + 1]);
        list.push([rowIndex - 1, colIndex - 1]);

        break;
      }
    }
    console.log(`returning adjacent indces - ${JSON.stringify(list)}`);
    return list;
  }
}
