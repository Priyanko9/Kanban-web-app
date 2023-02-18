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
      const { data } = state;
      const { newBoard } = payload;
      const newboards = data.boards.concat([newBoard]);
      return {
        ...state,
        data: {
          boards: newboards,
        },
      };
    case "CREATE_NEW_TASK":
      const { selectedBoard: currentBoard } = state;
      const { newTask } = payload;
      let taskAlreadyAdded = false;
      currentBoard?.columns[0]?.tasks.forEach((task, i) => {
        if (task.title === newTask.title) {
          taskAlreadyAdded = true;
        }
      });
      if (!taskAlreadyAdded) {
        currentBoard.columns[0].tasks = currentBoard?.columns[0]?.tasks.concat([
          newTask,
        ]);
      }

      // localStorage.setItem("appState", JSON.stringify(newState));
      return {
        ...state,
        selectedBoard: currentBoard,
      };

    case "ADD_NEW_COLUMN":
      const { selectedBoard: presentBoard } = state;
      const { column } = state;
      presentBoard.columns = presentBoard.columns.concat(column);
      return {
        ...state,
      };
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
      const { data: boardData } = state;
      const { selectedBoardIndex: currentBoardIndex } = payload;
      const newBoardsList = boardData.boards.filter((ele, i) => {
        if (i === currentBoardIndex) {
          return false;
        }
        return true;
      });
      boardData.boards = newBoardsList;
      return {
        ...state,
      };
      return;
    case "DELETE_TASK":
      const {
        selectedTaskIndex: taskIndex,
        selectedBoardName: boardName,
        selectedColumn: currentColumn,
      } = payload;
      const appLocalState = JSON.parse(localStorage.getItem("appState"));

      const newLocalState = appLocalState?.selectedBoard?.columns?.map(
        (col, i) => {
          if (col.name === currentColumn.name) {
            col.tasks.splice(taskIndex, 1);
            return col;
          }
          return col;
        }
      );
      const { data: { boards: boardsDataList } = {} } = appLocalState;
      const resultList = boardsDataList?.map((board, i) => {
        if (board.name === boardName) {
          board.columns = newLocalState;
        }
        return board;
      });
      appLocalState.data = resultList;

      return { ...appLocalState };
    case "EDIT_BOARD":
      const { data: currentData } = state;
      const { editedBoard } = payload;

      currentData.boards = currentData?.boards.map((board, i) => {
        if (board.title === editedBoard.title) {
          return editedBoard;
        }
        return board;
      });

      return {
        ...state,
      };
    case "EDIT_TASK":
      const {
        selectedTaskIndex,
        selectedBoardName,
        selectedColumn,
        newColumn,
        selectedTaskObj,
      } = payload;
      const appState = JSON.parse(localStorage.getItem("appState"));
      const newState = appState?.selectedBoard?.columns?.map((col, i) => {
        if (col.name === selectedColumn.name) {
          col.tasks.splice(selectedTaskIndex, 1);
          return col;
        }
        if (col.name === newColumn) {
          col.tasks = col.tasks.concat([selectedTaskObj]);
          return col;
        }
        return col;
      });
      const {
        data: { boards: boardsData },
      } = appState;
      const result = boardsData?.map((board, i) => {
        if (board.name === selectedBoardName) {
          board.columns = newState;
        }
        return board;
      });
      appState.data = result;
      return { ...appState };
    default:
      return state;
  }
};