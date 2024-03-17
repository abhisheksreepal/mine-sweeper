import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import StoreContext from "../../contexts/store.context";
import {
  cellButtonStyles,
  cellStyle,
  gameSectionTableStyle,
  rowStyle,
  tableStyle,
} from "../../styles/game.style";

const Game: FC = observer(() => {
  const { rootStore } = useContext(StoreContext);

  const onLeftClick = (rowIndex: number, colIndex: number) => {
    rootStore.gameStore.leftClickCell(rowIndex, colIndex);
  };
  const onRightClick = (
    event: React.MouseEvent,
    rowIndex: number,
    colIndex: number
  ) => {
    event.preventDefault();
    rootStore.gameStore.rightClickCell(rowIndex, colIndex);
  };
  return (
    <section css={gameSectionTableStyle}>
      <table css={tableStyle}>
        <tbody>
          {rootStore.gameStore.data.map((row, rowIndex) => {
            return (
              <tr key={rowIndex} css={rowStyle}>
                {row.map((data, colIndex) => {
                  return (
                    <td
                      key={colIndex}
                      onClick={() => {
                        onLeftClick(rowIndex, colIndex);
                      }}
                      onContextMenu={(e) => {
                        onRightClick(e, rowIndex, colIndex);
                      }}
                      css={cellStyle}
                    >
                      <button
                        css={cellButtonStyles}
                      >{`Flag - ${data.isFlagged} and Mine - ${data.isMinePresent} and click = ${data.isAlreadyClicked}`}</button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
});

export default Game;
