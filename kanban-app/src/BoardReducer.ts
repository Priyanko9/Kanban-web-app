import { backendData } from "./data";
import { BackendData, Board, Task, Column } from "./types";

interface State {
  selectedBoardIndex: number;
  data: BackendData;
  selectedBoard: Board | null;
}

export const initialState: State = {
  selectedBoardIndex: 0,
  data: backendData,
  selectedBoard: backendData.boards[0],
};

interface CreateNewBoardAction {
  type: "CREATE_NEW_BOARD";
  payload: {
    newBoard: Board;
  };
}

interface CreateNewTaskAction {
  type: "CREATE_NEW_TASK";
  payload: {
    newTask: Task;
  };
}

interface FetchBoardDataAction {
  type: "FETCH_BOARD_DATA";
  payload: {
    selectedBoard: number | null;
  };
}

interface EditBoardAction {
  type: "EDIT_BOARD";
  payload: {
    editedBoard: Board;
  };
}

interface EditTaskAction {
  type: "EDIT_TASK";
  payload: {
    selectedTaskIndex: number;
    selectedBoardName: string;
    selectedColumn: Column;
    newColumn: string;
    selectedTaskObj: Task;
  };
}

interface DeleteBoardAction {
  type: "DELETE_BOARD";
  payload?: {};
}

interface DeleteTaskAction {
  type: "DELETE_TASK";
  payload: {
    selectedTaskIndex: number;
    selectedBoardName: string;
    selectedColumn: Column;
  };
}

type Action =
  | CreateNewBoardAction
  | CreateNewTaskAction
  | FetchBoardDataAction
  | EditBoardAction
  | EditTaskAction
  | DeleteBoardAction
  | DeleteTaskAction;

export const BoardReducer = (state = initialState, action: Action) => {
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
      if (!currentBoard || !currentBoard.columns) {
        return state;
      }
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

      if (!selectedBoard) {
        return state;
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
      const newLocalState: Column[] | undefined =
        state?.selectedBoard?.columns?.map((col, i) => {
          if (col.name === currentColumn.name) {
            col.tasks.splice(taskIndex, 1);
            return col;
          }
          return col;
        });
      const { data: { boards: boardsDataList } = {} } = state;
      const resultList = boardsDataList?.map((board, i) => {
        if (board.name === boardName) {
          return { ...board, columns: newLocalState };
        }
        return board;
      });
      const newClonedState: State = { ...state };
      newClonedState.data.boards = resultList || [];

      return { ...newClonedState };

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

      const newState = state?.selectedBoard?.columns?.map((col, i) => {
        if (col.name === selectedColumn.name && newColumn !== "") {
          col.tasks.splice(selectedTaskIndex, 1);
          return col;
        }
        if (col.name === newColumn) {
          col.tasks = col.tasks.concat([selectedTaskObj]);
          return col;
        }
        if (col.name === selectedColumn.name) {
          col.tasks.splice(selectedTaskIndex, 1, selectedTaskObj);
          return col;
        }
        return col;
      });
      const {
        data: { boards: boardsData },
      } = state;
      const result = boardsData?.map((board, i) => {
        if (board.name === selectedBoardName) {
          board.columns = newState;
        }
        return board;
      });
      const clonedState = { ...state };
      clonedState.data.boards = result;
      return clonedState;

    default:
      return state;
  }
};
