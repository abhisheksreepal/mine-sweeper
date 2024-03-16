import { makeAutoObservable } from "mobx";
import RootStore from "./root.store";

interface History {
  gameNumber: number;
  score: number;
}

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

  historyData: History[] = [];
}
