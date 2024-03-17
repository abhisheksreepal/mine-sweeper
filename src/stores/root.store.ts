import { GameStore } from "./game.store";
import { HistoryStore } from "./history.store";
import { UiStore } from "./ui.store";

export default class RootStore {
  gameStore: GameStore;
  historyStore: HistoryStore;
  uiStore: UiStore;
  constructor() {
    this.gameStore = new GameStore(this);
    this.historyStore = new HistoryStore(this);
    this.uiStore = new UiStore(this);
  }
}
