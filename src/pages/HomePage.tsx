import React, { useContext } from "react";
import HeadingComponent from "../components/Heading.component";
import { observer } from "mobx-react-lite";
import StoreContext from "../contexts/store.context";
import GameComponent from "../components/Game.component";
import WelcomeComponent from "../components/Welcome.component";
import ModalComponent from "../components/Modal.component";
import ConfigurationComponent from "../components/Configuration.component";

const HomePage = observer(() => {
  const { rootStore } = useContext(StoreContext);

  return (
    <React.Fragment>
      <HeadingComponent></HeadingComponent>
      {rootStore.uiStore.showGameView ? (
        <GameComponent></GameComponent>
      ) : (
        <WelcomeComponent></WelcomeComponent>
      )}
      {rootStore.uiStore.showLaunchDialog ? (
        <ModalComponent
          isOpen={true}
          onClose={() => {
            rootStore.uiStore.showLaunchDialog = false;
          }}
        >
          <ConfigurationComponent></ConfigurationComponent>
        </ModalComponent>
      ) : null}
    </React.Fragment>
  );
});
export default HomePage;
