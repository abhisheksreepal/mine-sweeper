import React, { useContext } from "react";
import HeadingComponent from "../components/Heading.component";
import { observer } from "mobx-react-lite";
import StoreContext from "../contexts/store.context";
// import GameManagerComponent from "../components/game-manager/GameManager.component";
import WelcomeComponent from "../components/Welcome.component";
import ModalComponent from "../components/Modal.component";
import ConfigurationComponent from "../components/Configuration.component";
import HistoryComponent from "../components/HistoryComponent";
import FallBackLoadingComponent from "../components/FallBackLoading.component.ts";

const GameManagerComponent = React.lazy(() => {
  return import("../components/game-manager/GameManager.component");
});

const HomePage = observer(() => {
  const { rootStore } = useContext(StoreContext);

  const onClose = () => {
    rootStore.uiStore.showLaunchDialog = false;
  };

  const onHistoryClose = () => {
    rootStore.uiStore.showHistoryDialog = false;
  };

  return (
    <React.Fragment>
      <HeadingComponent></HeadingComponent>
      {rootStore.uiStore.showGameView ? (
        <React.Suspense
          fallback={<FallBackLoadingComponent></FallBackLoadingComponent>}
        >
          <GameManagerComponent></GameManagerComponent>
        </React.Suspense>
      ) : (
        <WelcomeComponent></WelcomeComponent>
      )}
      {rootStore.uiStore.showLaunchDialog ? (
        <ModalComponent
          modalTitle="Game Configuration"
          isOpen={true}
          onClose={onClose}
        >
          <ConfigurationComponent onClose={onClose}></ConfigurationComponent>
        </ModalComponent>
      ) : null}
      {rootStore.uiStore.showHistoryDialog ? (
        <ModalComponent
          modalTitle="Game History"
          isOpen={true}
          onClose={onHistoryClose}
        >
          <HistoryComponent onClose={onHistoryClose}></HistoryComponent>
        </ModalComponent>
      ) : null}
    </React.Fragment>
  );
});
export default HomePage;
