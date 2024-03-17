import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect } from "react";
import StoreContext from "../../contexts/store.context";
import {
  gameHeaderStyle,
  gameLoseStyle,
  gameStatusStyleContainer,
  gameStatusStyleDefault,
  gameStatusStyleVisible,
  gameWinStyle,
} from "../../styles/game-header.style";
import { buttonStyle, hStyle, pStyle } from "../../styles/common.styles";

const GameHeaderComponent: FC = observer(() => {
  const { rootStore } = useContext(StoreContext);

  const getDurationString = (
    string: TemplateStringsArray,
    ...value: number[]
  ) => {
    let strSecond = "second";
    if (Array.isArray(value) && value.length > 0) {
      if (value[0] > 1) {
        strSecond = "seconds";
      }
    }
    return `${string[0]} ${value[0]} ${strSecond}`;
  };

  const toggleCellInfo = () => {
    rootStore.gameStore.showCellInformation =
      !rootStore.gameStore.showCellInformation;
  };

  return (
    <React.Fragment>
      <section css={gameHeaderStyle}>
        <h2 css={hStyle}>
          {" "}
          {`Title - Game ${rootStore.gameStore.gameNumber}`}
        </h2>
        <p css={pStyle}>Score = {rootStore.gameStore.score}</p>
        <p css={pStyle}>
          Flag Counter = {rootStore.gameStore.counterForNoOfMinesWhenFlagged}
        </p>
        <p
          css={pStyle}
        >{getDurationString`Duration = ${rootStore.gameStore.durationCounter} second`}</p>
        <button css={buttonStyle} onClick={toggleCellInfo}>
          {rootStore.gameStore.showCellInformation
            ? "Hide Cell Info"
            : "Show Cell Info"}
        </button>
      </section>
      <section css={gameStatusStyleContainer}>
        <p
          aria-live="assertive"
          css={[
            gameStatusStyleDefault,
            rootStore.gameStore.isGameOver && gameStatusStyleVisible,
            rootStore.gameStore.didUserWin && gameWinStyle,
            !rootStore.gameStore.didUserWin && gameLoseStyle,
          ]}
        >
          {rootStore.gameStore.isGameOver
            ? rootStore.gameStore.didUserWin
              ? `You Won. Your Score is ${rootStore.gameStore.score}. Click Launch game button to play again`
              : "Sorry You Lose, Score is 0. Please try again by clicking Launch game button "
            : null}
        </p>
      </section>
    </React.Fragment>
  );
});

export default GameHeaderComponent;
