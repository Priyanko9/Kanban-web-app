import { useContext } from "react";
import { backendData } from "./data";
import BoardContent from "./BoardContent";

const BoardColumns = () => {
  const { boards } = backendData || [];

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {boards.map((board, index) => (
        <BoardContent board={board} />
      ))}
    </div>
  );
};

export default BoardColumns;
