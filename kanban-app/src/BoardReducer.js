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
      const savedData = JSON.parse(localStorage.getItem("appState"));
      if (!savedData) {
        localStorage.setItem("appState", JSON.stringify(state));
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
    // const { selectedTaskIndex, selectedBoardName, selectedColumn } = payload;
    // const appState = JSON.parse(localStorage.getItem("appState"));

    // const newState = appState?.selectedBoard?.columns?.map((col, i) => {
    //   if (col.name === selectedColumn.name) {
    //     col.tasks.splice(selectedTaskIndex, 1);
    //     return col;
    //   }
    //   return col;
    // });
    // const { data: { boards: boardsData } = {} } = appState;
    // const result = boardsData?.map((board, i) => {
    //   if (board.name === selectedBoardName) {
    //     board.columns = newState;
    //   }
    //   return board;
    // });
    // appState.data = result;
    // appState.delete = true;

    // return { ...appState };
    case "EDIT_BOARD":
    case "EDIT_TASK":
    // const {
    //   selectedTaskIndex,
    //   selectedBoardName,
    //   selectedColumn,
    //   newColumn,
    //   selectedTaskObj,
    // } = payload;
    // const appState = JSON.parse(localStorage.getItem("appState"));
    // const newState = appState?.selectedBoard?.columns?.map((col, i) => {
    //   if (col.name === selectedColumn.name) {
    //     col.tasks.splice(selectedTaskIndex, 1);
    //     return col;
    //   }
    //   if (col.name === newColumn) {
    //     col.tasks.push(selectedTaskObj);
    //     return col;
    //   }
    //   return col;
    // });
    // const {
    //   data: { boards: boardsData },
    // } = appState;
    // const result = boardsData?.map((board, i) => {
    //   if (board.name === selectedBoardName) {
    //     board.columns = newState;
    //   }
    //   return board;
    // });
    // appState.data = result;
    // localStorage.setItem("appState",JSON.stringify(appState))
    // return { ...appState };
  }
};
