export interface GameHistoryInterface {
  gameNumber: number;
  score: number;
  level: DIFFICULY_LEVEL;
}

export enum DIFFICULY_LEVEL {
  EASY,
  MEDIUM,
  HARD,
  CUSTOM,
}

export interface CellInterface {
  isMinePresent: boolean;
  isAlreadyClicked: boolean;
  isFlagged: boolean;
}
