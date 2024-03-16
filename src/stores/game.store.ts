import { CellInterface, DIFFICULY_LEVEL } from "../interfaces/common.interface";
import RootStore from "./root.store";
import { makeAutoObservable, runInAction } from "mobx";

export class GameStore {
  private rootStore: RootStore;
  private gameStoreInstance: GameStore | null = null;
  durationCounter: number = 0; // counter in seconds
  rows: number = 1; // Setting to minimum value. Can be used as default values
  column: number = 1; // Setting to minimum value. Can be used as default values
  noOfMines: number = 1; /* noofMines should be less or equal to rows*col, else show Error 
  and disable this when difficulty level is chosen, so we can custom decide noOfMines on difficluty level */

  counterForNoOfMinesWhenFlagged = 1;

  startDurationCounter() {
    let interval;
    if (this.isGameStarted) {
      interval = setInterval(() => {
        runInAction(() => {
          this.setDurationCounter();
        });
      }, 1000);
    } else {
      clearInterval(interval);
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
    }
    return gameover;
  }

  didUserFoundMine = false;

  get didUserWin() {
    return !this.didUserFoundMine && this.areAllCellsWithoutMineClicked;
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
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.column; j++) {
        if (
          !this.data[i][j].isAlreadyClicked &&
          !this.data[i][j].isMinePresent
        ) {
          return false;
        }
        if (this.data[i][j].isMinePresent) {
          this.didUserFoundMine = true;
        }
      }
    }

    return true;
  }

  private __noOfMines = 1; // Internal variable just to track when populating mines
  populateMines(): void {
    this.isGameStarted = true;
    this.__noOfMines = this.noOfMines;
    this.counterForNoOfMinesWhenFlagged = this.noOfMines;
    for (let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < this.column; j++) {
        this.data[i][j] = {
          isMinePresent: this.randomizeMine(),
          isAlreadyClicked: false,
          isFlagged: false,
        };
      }
    }
  }

  private randomizeMine(): boolean {
    const addMine = Math.random() < 0.5 ? true : false;
    if (this.__noOfMines < 1) {
      return false;
    }
    if (this.__noOfMines < this.rows * this.column) {
      if (addMine) {
        --this.__noOfMines;
      }
      return addMine;
    } else if (this.__noOfMines === this.rows * this.column) {
      --this.__noOfMines;
      return true;
    }
    return addMine;
  }

  setNoOfMinesBasedOnDifficulty(
    difficultyLevel: DIFFICULY_LEVEL,
    noOfMines?: number
  ) {
    switch (difficultyLevel) {
      case DIFFICULY_LEVEL.EASY: {
        this.noOfMines = Math.floor((20 / 100) * this.rows * this.column);
        break;
      }
      case DIFFICULY_LEVEL.MEDIUM: {
        this.noOfMines = Math.floor((50 / 100) * this.rows * this.column);
        break;
      }
      case DIFFICULY_LEVEL.HARD: {
        this.noOfMines = Math.floor((80 / 100) * this.rows * this.column);
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
    cell.isFlagged = false;
  }

  rightClickCell(rowIndex: number, colIndex: number) {
    const cell = this.data[rowIndex][colIndex];
    if (this.counterForNoOfMinesWhenFlagged === 0) {
      return;
    } else if (this.counterForNoOfMinesWhenFlagged === this.noOfMines) {
      return;
    }
    if (cell.isAlreadyClicked) {
      return;
    }
    cell.isFlagged = !cell.isFlagged;
    if (cell.isFlagged) {
      --this.counterForNoOfMinesWhenFlagged;
    } else {
      ++this.counterForNoOfMinesWhenFlagged;
    }
  }

  resetGame() {
    this.durationCounter = 0;
    this.rows = 1;
    this.column = 1;
    this.noOfMines = 1;
    this.counterForNoOfMinesWhenFlagged = 1;
    this.__noOfMines = 1;
    this.data = [];
    this.isGameStarted = false;
    this.didUserFoundMine = false;
  }

  isNoOfMinesValid(noOfMines: number, rows: number, column: number): boolean {
    if (noOfMines < 1 || noOfMines > rows * column) {
      return false;
    }
    return true;
  }
}
