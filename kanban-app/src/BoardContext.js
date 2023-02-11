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

  return (
    <BoardContext.Provider value={{ fetchBoard, state }}>
      {children}
    </BoardContext.Provider>
  );
};
