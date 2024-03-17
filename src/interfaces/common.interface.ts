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

export enum CELL_POSITION {
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
  LEFT_1D,
  RIGHT_1D,
  TOP_SIDE,
  BOTTOM_SIDE,
  LEFT_SIDE,
  RIGHT_SIDE,
  MID,
  MID_ROW_1D,
  TOP_1D,
  BOTTOM_1D,
  MID_COL_1D,
}
