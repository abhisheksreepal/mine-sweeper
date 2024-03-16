import { makeAutoObservable } from "mobx";
import RootStore from "./root.store";

export class UiStore {
  rootStore: RootStore;
  uiStoreInstance: UiStore | null = null;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    if (!this.uiStoreInstance) {
      this.uiStoreInstance = this;
      makeAutoObservable(this);
    }

    return this.uiStoreInstance;
  }
  _showLaunchDialog = false;
  showGameView = false;
  showHistoryView = false;

  set showLaunchDialog(show: boolean) {
    this._showLaunchDialog = show;
  }

  get showLaunchDialog() {
    return this._showLaunchDialog;
  }
}
