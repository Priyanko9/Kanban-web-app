import { createContext, useReducer, ReactNode, useMemo } from "react";
import { BoardReducer, initialState } from "./BoardReducer";
import { Task, Column, Board } from "./types";

interface EditPayload {
  selectedTaskIndex: number;
  selectedBoardName: string;
  selectedColumn: Column | null;
  newColumn: string;
  selectedTaskObj: Task | null;
}

interface DeletePayload {
  selectedTaskIndex: number;
  selectedBoardName: string;
  selectedColumn: Column;
}
interface BoardCtx {
  fetchBoard: Function;
  state: typeof initialState;
  editTask: (payload: EditPayload) => void;
  deleteTask: Function;
  addNewTask: Function;
  createNewBoard: Function;
  deleteBoard: Function;
  editBoard: Function;
}

interface Props {
  children?: ReactNode;
}

export const BoardContext = createContext<BoardCtx | null>(null);

export const BoardProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(BoardReducer, initialState);

  const fetchBoard = (selectedBoard: number | null) => {
    dispatch({
      type: "FETCH_BOARD_DATA",
      payload: {
        selectedBoard,
      },
    });
  };

  const editTask = ({
    selectedTaskIndex,
    selectedBoardName,
    selectedColumn,
    newColumn,
    selectedTaskObj,
  }: EditPayload) => {
    dispatch({
      type: "EDIT_TASK",
      payload: {
        selectedTaskIndex,
        selectedBoardName,
        selectedColumn,
        newColumn,
        selectedTaskObj,
      },
    });
  };

  const deleteTask = ({
    selectedTaskIndex,
    selectedBoardName,
    selectedColumn,
  }: DeletePayload) => {
    dispatch({
      type: "DELETE_TASK",
      payload: {
        selectedTaskIndex,
        selectedBoardName,
        selectedColumn,
      },
    });
  };

  const addNewTask = (newTask: Task) => {
    dispatch({
      type: "CREATE_NEW_TASK",
      payload: {
        newTask,
      },
    });
  };

  const createNewBoard = (newBoard: Board) => {
    dispatch({
      type: "CREATE_NEW_BOARD",
      payload: {
        newBoard,
      },
    });
  };

  const deleteBoard = () => {
    dispatch({
      type: "DELETE_BOARD",
    });
  };

  const editBoard = (editedBoard: Board) => {
    dispatch({
      type: "EDIT_BOARD",
      payload: {
        editedBoard,
      },
    });
  };

  const contextValue: BoardCtx = useMemo(
    () => ({
      fetchBoard,
      state,
      editTask,
      deleteTask,
      addNewTask,
      createNewBoard,
      deleteBoard,
      editBoard,
    }),
    [state]
  );

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};
