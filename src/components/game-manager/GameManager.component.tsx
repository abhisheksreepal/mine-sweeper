import React, { FC, useContext, useEffect } from "react";
import GameHeaderComponent from "./GameHeader.component";
import Game from "./Game.component";
import { observer } from "mobx-react-lite";
import StoreContext from "../../contexts/store.context";

const GameManagerComponent: FC = observer(() => {
  const { rootStore } = useContext(StoreContext);
  useEffect(() => {
    console.log(
      `is GameOver ${rootStore.gameStore.isGameOver} and didUser win ${rootStore.gameStore.didUserWin}`
    );
  }, [rootStore.gameStore.isGameOver, rootStore.gameStore.didUserWin]);

  return (
    <section>
      <GameHeaderComponent></GameHeaderComponent>
      <Game></Game>
    </section>
  );
});

export default GameManagerComponent;
