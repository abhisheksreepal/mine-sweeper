import { makeAutoObservable } from "mobx";
import RootStore from "./root.store";
import { GameHistoryInterface } from "../interfaces/common.interface";

export class HistoryStore {
  private rootStore: RootStore;
  private historyStoreInstance: HistoryStore | null = null;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    if (!this.historyStoreInstance) {
      this.historyStoreInstance = this;
      makeAutoObservable(this);
    }

    return this.historyStoreInstance;
  }

  historyData: GameHistoryInterface[] = [];
}
