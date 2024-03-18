import { DIFFICULY_LEVEL } from "../interfaces/common.interface";
import { GameStore } from "./game.store";
import RootStore from "./root.store";

describe("game store", () => {
  let rootSTore: RootStore;
  let gameStore: GameStore;
  beforeEach(() => {
    rootSTore = new RootStore();
    gameStore = new GameStore(rootSTore);
  });

  it("Check for populated mines for CUSTOM difficulty", () => {
    gameStore.rows = 2;
    gameStore.column = 2;
    gameStore.noOfMines = 2;
    gameStore.difficultyLevel = DIFFICULY_LEVEL.CUSTOM;

    gameStore.populateMines();
    expect(gameStore.isGameStarted).toBeTruthy();
    expect(rootSTore.uiStore.showGameView).toBeTruthy();
    expect(gameStore.data.length).toBe(2);

    expect(gameStore.data[0].length).toBe(2);
    expect(gameStore.data[1].length).toBe(2);

    let mineCount = 0;
    gameStore.data.forEach((item, rowIndex) => {
      item.forEach((col, colindex) => {
        if (gameStore.data[rowIndex][colindex].isMinePresent) {
          ++mineCount;
        }
      });
    });
    console.log(JSON.stringify(gameStore.data));
    expect(mineCount).toBe(2);
  });

  afterEach(() => {
    gameStore.stopDurationCounter();
  });
});
