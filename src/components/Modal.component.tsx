import { css } from "@emotion/react";
import React, { FC, useRef, useEffect, ReactElement } from "react";
import {
  modalCloseButton,
  modalDescription,
  modalOverlay,
  modalStyle,
  modalTitle,
} from "../styles/modal.styles";

const ModalComponent = ({
  isOpen,
  onClose,
  children,
  modalTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement;
  modalTitle: string;
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef?.current?.focus();
    }
  }, [isOpen]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      tabIndex={-1}
      ref={dialogRef}
      onKeyDown={handleKeyPress}
      css={modalOverlay}
    >
      <div className="modal" css={modalStyle}>
        <h2 id="modal-title" css={modalTitle}>
          {modalTitle}
        </h2>
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close dialog"
          css={modalCloseButton}
        >
          <span aria-hidden="true">×</span>
        </button>
        <div id="modal-description" css={modalDescription}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
