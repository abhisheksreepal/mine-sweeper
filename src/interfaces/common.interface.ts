export interface GameHistoryInterface {
  gameNumber: number;
  score: number;
  level: string;
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
