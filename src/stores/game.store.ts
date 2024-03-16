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

  interval: NodeJS.Timeout | null = null;

  get score() {
    const status = this.didUserWin;
    if (status) {
      return Math.floor(
        (this.noOfMines / (this.rows * this.column * this.durationCounter)) *
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
    }
    return gameover;
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
  }

  isNoOfMinesValid(noOfMines: number, rows: number, column: number): boolean {
    if (noOfMines < 1 || noOfMines > rows * column) {
      return false;
    }
    return true;
  }
}
