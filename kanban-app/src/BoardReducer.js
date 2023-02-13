import { backendData } from "./data";

export const initialState = {
  selectedBoardIndex: 0,
  data: backendData,
  selectedBoard: backendData.boards[0],
};

export const BoardReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "CREATE_NEW_BOARD":
    case "CREATE_NEW_TASK":
    case "ADD_NEW_COLUMN":
    case "FETCH_BOARD_DATA":
      const {
        selectedBoardIndex,
        data: { boards },
      } = state;
      const { selectedBoard } = payload;
      const savedData = localStorage.getItem("appState");
      if (!savedData) {
        localStorage.setItem("appState", state);
      }

      return {
        ...state,
        selectedBoard: !selectedBoard
          ? boards[selectedBoardIndex]
          : boards[selectedBoard],
      };

    case "DELETE_BOARD":
      return;
    case "DELETE_TASK":
      return;
    case "EDIT_TASK":

    case "EDIT_BOARD":
    case "CHANGE_TASK_STATUS":
      const {
        selectedTaskIndex,
        selectedBoardName,
        selectedColumn,
        newColumn,
        selectedTaskObj,
      } = payload;
      const appState = localStorage.getItem("appState");
      const newState = appState.boards.map((board, index) => {
        if (board.name === selectedBoardName) {
          return board.columns.map((col, i) => {
            if (col.name === selectedColumn) {
              return col.tasks.filter((task, j) => {
                if (j === selectedTaskIndex) {
                  return false;
                }
                return true;
              });
            }
            if (col.name === newColumn) {
              col.tasks.push(selectedTaskObj);
              return col;
            }
          });
        }
      });
  }
};
