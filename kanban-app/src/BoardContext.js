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

  return (
    <BoardContext.Provider value={{ fetchBoard, state, editTask, deleteTask }}>
      {children}
    </BoardContext.Provider>
  );
};
