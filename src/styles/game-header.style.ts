import { css, keyframes } from "@emotion/react";

export const gameHeaderStyle = css`
  display: flex;
  align-items: center;
  margin: 10px;
`;

export const gameStatusStyleDefault = css`
  visibility: visible;
  opacity: 0;
  transition: opacity 2s ease-in;
  margin: 20px;
  height: 30px;
  animation: scroll 2s linear infinite;

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(20%);
    }
  }
`;

export const gameStatusStyleVisible = css`
  opacity: 1;
`;

export const gameWinStyle = css`
  color: darkgreen;
  font-size: 20px;
`;

export const gameLoseStyle = css`
  color: darkred;
  font-size: 15px;
`;

export const gameStatusStyleContainer = css`
  overflow: hidden;
`;
