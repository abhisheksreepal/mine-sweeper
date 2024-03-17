import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import StoreContext from "../contexts/store.context";
import { buttonStyle } from "../styles/common.styles";
import { buttonStyleV2, titleStyle } from "../styles/heading.style";

const HeadingComponent: FC = observer(() => {
  const { rootStore } = useContext(StoreContext);
  const onLaunchGame = () => {
    rootStore.gameStore.resetGame();
    rootStore.uiStore.showLaunchDialog = !rootStore.uiStore.showLaunchDialog;
  };

  return (
    <React.Fragment>
      <h1 css={titleStyle} className="title">
        Mine Sweep
      </h1>
      <button
        name="launch-game"
        onClick={onLaunchGame}
        css={buttonStyleV2}
        disabled={rootStore.gameStore.isGameStarted}
      >
        Launch Game
      </button>
    </React.Fragment>
  );
});

export default HeadingComponent;
