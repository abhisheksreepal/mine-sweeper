import { css } from "@emotion/react";

export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const modalStyle = css`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  @media screen and (max-width: 768px) {
    height: 100vh;
    width: 100vw;
    overflow: auto;
  }

  @media screen and (max-height: 600px) {
    height: 100vh;
    width: 100vw;
    overflow: auto;
  }
`;

export const modalCloseButton = css`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
`;

export const modalTitle = css`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const modalDescription = css`
  font-size: 16px;
`;
