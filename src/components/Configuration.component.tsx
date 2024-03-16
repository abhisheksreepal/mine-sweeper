import React, { FC, useContext, useRef, useState } from "react";

import {
  fieldSetStyles,
  labelStyles,
  inputStyles,
  buttonStyle,
  radioStyles,
} from "../styles/common.styles";
import StoreContext from "../contexts/store.context";
import { DIFFICULY_LEVEL } from "../interfaces/common.interface";
import { observer } from "mobx-react-lite";
import { groupDivStyles } from "../styles/configuration.styles";

const ConfigurationComponent: FC<{ onClose: () => void }> = observer(
  ({ onClose }) => {
    const { rootStore } = useContext(StoreContext);
    const noOfMineInputRef = useRef<HTMLInputElement>(null);
    const [disableManualField, setDisableManualField] = useState(false);
    const [disableDifficultyField, setDisableDifficultyField] = useState(true);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      const form = event.currentTarget as HTMLFormElement;
      if (form.checkValidity()) {
        event.preventDefault();
        if (
          !rootStore.gameStore.isNoOfMinesValid(
            rootStore.gameStore.noOfMines,
            rootStore.gameStore.rows,
            rootStore.gameStore.column
          )
        ) {
          noOfMineInputRef?.current?.setCustomValidity(
            `Please enter value less than ${
              rootStore.gameStore.rows * rootStore.gameStore.column
            }`
          );
          noOfMineInputRef?.current?.reportValidity();

          return;
        } else {
          // Start the game here. TODO
          console.log(event);
        }
      } else {
        form.reportValidity();
        return;
      }
    };

    const disableManualFields = (status: boolean) => {
      setDisableDifficultyField(!status);
      setDisableManualField(status);
    };

    const onSelectingGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event);
      if (event.target.value === "group1") {
        disableManualFields(false);
        rootStore.gameStore.difficultyLevel = DIFFICULY_LEVEL.CUSTOM;
      } else {
        disableManualFields(true);
      }
    };

    const onEnteringNoOfMines = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const number = parseInt(event.target.value);
      noOfMineInputRef?.current?.setCustomValidity("");
      if (!isNaN(number) && number > 0) {
        rootStore.gameStore.noOfMines = number;
      }
    };

    const onEnteringNoORows = (event: React.ChangeEvent<HTMLInputElement>) => {
      const number = parseInt(event.target.value);
      if (!isNaN(number) && number > 0) {
        rootStore.gameStore.rows = number;
      }
    };

    const onEnteringNoOfCols = (event: React.ChangeEvent<HTMLInputElement>) => {
      const number = parseInt(event.target.value);
      if (!isNaN(number) && number > 0) {
        rootStore.gameStore.column = number;
      }
    };
    const onSelectingDifficultyLevel = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (event.target.value === "easy") {
        rootStore.gameStore.difficultyLevel = DIFFICULY_LEVEL.EASY;
      } else if (event.target.value === "medium") {
        rootStore.gameStore.difficultyLevel = DIFFICULY_LEVEL.MEDIUM;
      } else {
        rootStore.gameStore.difficultyLevel = DIFFICULY_LEVEL.HARD;
      }
    };
    return (
      <form onSubmit={onSubmit}>
        <fieldset css={fieldSetStyles}>
          <legend>Row and Column</legend>
          <label css={labelStyles} htmlFor="row">
            Enter No of Rows
          </label>
          <input
            css={inputStyles}
            type="number"
            name="row"
            required
            min={1}
            onChange={onEnteringNoORows}
          ></input>
          <label css={labelStyles} htmlFor="col">
            Enter No of Columns
          </label>
          <input
            css={inputStyles}
            type="number"
            name="col"
            required
            min={1}
            onChange={onEnteringNoOfCols}
          ></input>
        </fieldset>
        <fieldset css={fieldSetStyles}>
          <legend>Select Custom OR Game difficulty</legend>

          <label css={labelStyles}>
            <input
              onChange={onSelectingGroup}
              type="radio"
              name="group"
              defaultChecked
              value={"group1"}
              css={radioStyles}
            ></input>
            Custom
          </label>
          <fieldset css={fieldSetStyles}>
            <legend>Select number of mines </legend>

            <label css={labelStyles} htmlFor="no-of-mine">
              Enter no of mine
            </label>
            <input
              css={inputStyles}
              type="number"
              name="no-of-mine"
              required
              min={0}
              disabled={disableManualField}
              onChange={onEnteringNoOfMines}
              ref={noOfMineInputRef}
            ></input>
          </fieldset>

          <label css={labelStyles}>
            <input
              css={radioStyles}
              type="radio"
              name="group"
              value={"group2"}
              onChange={onSelectingGroup}
            ></input>
            Difficulty Level
          </label>

          <fieldset css={fieldSetStyles}>
            <legend>Select Difficulty level </legend>

            <label css={labelStyles}>
              <input
                css={radioStyles}
                type="radio"
                name="level"
                value={"easy"}
                onChange={onSelectingDifficultyLevel}
                disabled={disableDifficultyField}
                required
              ></input>
              EASY
            </label>
            <label css={labelStyles}>
              <input
                css={radioStyles}
                type="radio"
                name="level"
                value={"medium"}
                onChange={onSelectingDifficultyLevel}
                disabled={disableDifficultyField}
                required
              ></input>
              MEDIUM
            </label>
            <label css={labelStyles}>
              <input
                css={radioStyles}
                type="radio"
                name="level"
                value={"hard"}
                onChange={onSelectingDifficultyLevel}
                disabled={disableDifficultyField}
                required
              ></input>
              HARD
            </label>
          </fieldset>
        </fieldset>
        <div className="button-group" css={groupDivStyles}>
          <button css={buttonStyle} type="submit">
            Start Game
          </button>
          <button css={buttonStyle} onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    );
  }
);

export default ConfigurationComponent;
