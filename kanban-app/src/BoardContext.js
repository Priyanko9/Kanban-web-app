import { createContext, useReducer } from "react";
import { BoardReducer, initialState } from "./BoardReducer";

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BoardReducer, initialState);

  const fetchBoard = (selectedBoard) => {
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
  }) => {
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
  }) => {
    dispatch({
      type: "DELETE_TASK",
      payload: {
        selectedTaskIndex,
        selectedBoardName,
        selectedColumn,
        deleteFlag: false,
      },
    });
  };

  const addNewTask = (newTask) => {
    dispatch({
      type: "CREATE_NEW_TASK",
      payload: {
        newTask,
      },
    });
  };

  const createNewBoard = (newBoard) => {
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

  const editBoard = (editedBoard) => {
    dispatch({
      type: "EDIT_BOARD",
      payload: {
        editedBoard,
      },
    });
  };

  return (
    <BoardContext.Provider
      value={{
        fetchBoard,
        state,
        editTask,
        deleteTask,
        addNewTask,
        createNewBoard,
        deleteBoard,
        editBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
