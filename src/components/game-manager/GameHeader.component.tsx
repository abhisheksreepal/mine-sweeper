import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect } from "react";
import StoreContext from "../../contexts/store.context";

const GameHeaderComponent: FC = observer(() => {
  const { rootStore } = useContext(StoreContext);

  return (
    <section>
      <h2>Duration - {rootStore.gameStore.durationCounter}</h2>
      <p>View History </p>
      <p>Flag Counter - {rootStore.gameStore.counterForNoOfMinesWhenFlagged}</p>
      <p>Score = {rootStore.gameStore.score}</p>
    </section>
  );
});

export default GameHeaderComponent;
