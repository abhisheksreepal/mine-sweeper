import { makeAutoObservable } from "mobx";
import RootStore from "./root.store";

/* This store contains UI states only and states which are needed between components

Do not mix busines states here(Create a seperate store for business data) and also if UI component state need not to be shared, please use useState rather than adding it here
*/

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
