import React, { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import StoreContext from "../contexts/store.context";
import {
  cellStyle,
  emptyPageStyle,
  headerStyle,
  tableStyle,
} from "../styles/history.style";
const HistoryComponent: FC<{ onClose: () => void }> = observer(
  ({ onClose }) => {
    const { rootStore } = useContext(StoreContext);

    return (
      <React.Fragment>
        {rootStore.historyStore.historyData.length === 0 ? (
          <p css={emptyPageStyle}>
            No History Found. Please play game atleast once.
          </p>
        ) : (
          <React.Fragment>
            <table css={tableStyle}>
              <tbody>
                <tr>
                  <th css={headerStyle}>Title</th>
                  <th css={headerStyle}>Score</th>
                  <th css={headerStyle}>Difficulty Level</th>
                </tr>
                {rootStore.historyStore.historyData.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td css={cellStyle}>Game {data.gameNumber}</td>
                      <td css={cellStyle}>{data.score}</td>
                      <td css={cellStyle}>{data.level}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
);

export default HistoryComponent;
