import { observer } from "mobx-react-lite";
import React, { FC, useContext } from "react";
import StoreContext from "../../contexts/store.context";
import {
  actionCellButtonStyles,
  cellButtonStyles,
  cellInfoStyles,
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
    if (rootStore.gameStore.isGameOver) {
      return;
    }
    event.preventDefault();
    rootStore.gameStore.rightClickCell(rowIndex, colIndex);
  };
  return (
    <section css={gameSectionTableStyle}>
      <table css={tableStyle}>
        <tbody>
          {rootStore.gameStore.data.map((row, rowIndex) => {
            return (
              <tr key={rowIndex} id={rowIndex.toString()} css={rowStyle}>
                {row.map((data, colIndex) => {
                  return (
                    <td key={colIndex} id={colIndex.toString()} css={cellStyle}>
                      <button
                        css={actionCellButtonStyles}
                        disabled={
                          rootStore.gameStore.isGameOver ||
                          (rootStore.gameStore.data[rowIndex][colIndex]
                            .isAlreadyClicked &&
                            !rootStore.gameStore.data[rowIndex][colIndex]
                              .isMinePresent)
                        }
                        onClick={() => {
                          onLeftClick(rowIndex, colIndex);
                        }}
                        onContextMenu={(e) => {
                          onRightClick(e, rowIndex, colIndex);
                        }}
                      >
                        {(rootStore.gameStore.data[rowIndex][colIndex]
                          .isMinePresent &&
                          rootStore.gameStore.data[rowIndex][colIndex]
                            .isAlreadyClicked) ||
                        (rootStore.gameStore.data[rowIndex][colIndex]
                          .isMinePresent &&
                          rootStore.gameStore.isGameOver &&
                          !rootStore.gameStore.didUserWin) ? (
                          <abbr title="Mine Found">X</abbr>
                        ) : rootStore.gameStore.data[rowIndex][colIndex]
                            .isFlagged ? (
                          <abbr title="Flagged for Mine">?</abbr>
                        ) : (
                          <p>
                            {rootStore.gameStore.data[rowIndex][colIndex]
                              .isAlreadyClicked &&
                              rootStore.gameStore.getCountOfAdjacentMines(
                                rowIndex,
                                colIndex
                              )}
                          </p>
                        )}
                      </button>
                      {rootStore.gameStore.showCellInformation && (
                        <p css={cellInfoStyles}>
                          {`Flag - ${data.isFlagged},Mine - ${data.isMinePresent},click = ${data.isAlreadyClicked}`}
                        </p>
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
