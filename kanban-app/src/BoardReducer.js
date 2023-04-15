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
        selectedBoardIndex: newboards.length - 1,
        selectedBoard: newboards[newboards.length - 1],
      };
    case "CREATE_NEW_TASK":
      const {
        selectedBoard: currentBoard,
        data: { boards: currentBoards },
      } = state;
      const { newTask } = payload;
      const newTasksList = currentBoard?.columns[0]?.tasks.concat([newTask]);

      const newStateObj = {
        ...state,
        selectedBoard: {
          name: currentBoard.name,
          columns: [
            { name: currentBoard.columns[0].name, tasks: newTasksList },
            ...currentBoard.columns.slice(1, currentBoard.columns.length),
          ],
        },
        data: {
          boards: [
            {
              name: currentBoard.name,
              columns: [
                { name: currentBoard.columns[0].name, tasks: newTasksList },
                ...currentBoard.columns.slice(1, currentBoard.columns.length),
              ],
            },
            ...currentBoards.slice(1, currentBoards.length),
          ],
        },
      };
      return newStateObj;

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
      const selectedBoardString = `${selectedBoard}`;
      return {
        ...state,
        selectedBoard: !selectedBoardString
          ? boards[selectedBoardIndex]
          : boards[selectedBoard],
        selectedBoardIndex: selectedBoard,
      };

    case "DELETE_BOARD":
      const { data: boardData, selectedBoardIndex: currentBoardIndex } = state;

      const newBoardsList = boardData.boards.filter(
        (ele, i) => i !== currentBoardIndex
      );

      return {
        ...state,
        data: {
          boards: newBoardsList,
        },
        selectedBoard: newBoardsList[0],
      };

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
      appLocalState.data.boards = resultList;

      return { ...appLocalState };
    case "EDIT_BOARD":
      const { data: currentData, selectedBoardIndex: presentBoardIndex } =
        state;
      const { editedBoard } = payload;

      const newBoardsArray = currentData?.boards.map((board, i) => {
        if (i === presentBoardIndex) {
          return editedBoard;
        }
        return board;
      });

      return {
        ...state,
        data: {
          boards: newBoardsArray,
        },
      };
    case "EDIT_TASK":
      const {
        selectedTaskIndex,
        selectedBoardName,
        selectedColumn,
        newColumn,
        selectedTaskObj,
      } = payload;
      if (newColumn === "") {
        return state;
      }
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
      appState.data.boards = result;
      return { ...appState };
    default:
      return state;
  }
};
