import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import StoreContext from "../../contexts/store.context";
import {
  actionCellButtonStyles,
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
                      {rootStore.gameStore.showCellInformation ? (
                        <button
                          css={cellButtonStyles}
                        >{`Flag - ${data.isFlagged} and Mine - ${data.isMinePresent} and click = ${data.isAlreadyClicked}`}</button>
                      ) : (
                        <button
                          css={actionCellButtonStyles}
                          disabled={
                            rootStore.gameStore.data[rowIndex][colIndex]
                              .isAlreadyClicked &&
                            !rootStore.gameStore.data[rowIndex][colIndex]
                              .isMinePresent
                          }
                        >
                          {rootStore.gameStore.data[rowIndex][colIndex]
                            .isMinePresent &&
                          rootStore.gameStore.data[rowIndex][colIndex]
                            .isAlreadyClicked ? (
                            <abbr title="Mine Found">X</abbr>
                          ) : rootStore.gameStore.data[rowIndex][colIndex]
                              .isFlagged ? (
                            <abbr title="Flagged for Mine">?</abbr>
                          ) : (
                            ""
                          )}
                        </button>
                      )}
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
