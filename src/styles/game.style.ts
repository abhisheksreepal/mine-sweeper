import { css } from "@emotion/react";

export const cellButtonStyles = css`
  margin: 5px;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 12px;
  border: 1px solid;
`;

export const tableStyle = css`
  border: 1px solid black;
  background-color: bisque;
`;

export const rowStyle = css`
  /* border: 1px solid black; */
`;

export const cellStyle = css`
  border: 1px solid;
`;

export const gameSectionTableStyle = css`
  max-width: 80%;
  height: 60vh;
  overflow: auto;
`;

export const actionCellButtonStyles = css`
  ${cellButtonStyles};
  width: 30px;
  height: 30px;
`;

export const cellInfoStyles = css`
  margin-left: 10px;
  font-size: 10px;
`;
