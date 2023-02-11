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
      let boardData = {};

      if (!selectedBoard) {
        boardData = boards[selectedBoardIndex];
      } else {
        boardData = boards[selectedBoard];
      }

      return {
        ...state,
        selectedBoard: boardData,
      };

    case "DELETE_BOARD":
    case "DELETE_TASK":
    case "EDIT_TASK":
    case "EDIT_BOARD":
  }
};
