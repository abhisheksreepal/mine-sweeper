import { makeAutoObservable } from "mobx";
import RootStore from "./root.store";
import { GameHistoryInterface } from "../interfaces/common.interface";

export class HistoryStore {
  rootStore: RootStore;
  historyStoreInstance: HistoryStore | null = null;
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
