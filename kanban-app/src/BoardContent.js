import styled from "styled-components";
import { useContext, memo } from "react";
import { backendData } from "./data";
import { ThemeContext } from "./App";
import { BoardContext } from "./BoardContext";

const StyledTaskTitle = styled.div`
  padding: 20px;
  width: 300px;
  background: white;
  margin-bottom: 10px;
  border-radius: 15px;
`;

const StyledTaskTile = styled.div`
  background: ${(props) => props.theme.colors.lightSilver};
  height: 100vw;
  padding: 10px;
  display: flex;
`;

const calculatePendingSubtask = (subtasks) => {
  let count = 0;
  subtasks.forEach((subtask, ele) => {
    if (subtask.isCompleted) {
      count++;
    }
  });
  return count;
};

const BoardContent = ({ board }) => {
  const { theme } = useContext(ThemeContext);
  const { state } = useContext(BoardContext);
  const { selectedBoard } = state;
  if (selectedBoard?.columns.length === 0) {
    return (
      <div>
        <div>The Board is empty.Create a new column to get started</div>
        <div>+ Add New Column</div>
      </div>
    );
  }
  return (
    <StyledTaskTile theme={theme}>
      {selectedBoard.columns.map((column, i) => {
        return (
          <div style={{ marginLeft: "10px" }}>
            <div>{column.name}</div>
            {column.tasks.map((task, index) => {
              const completedTask = calculatePendingSubtask(task.subtasks);
              return (
                <StyledTaskTitle>
                  <div>{task.title}</div>
                  <div style={{ fontSize: "11px", marginTop: "10px" }}>
                    {completedTask} of {task.subtasks.length} subtasks
                  </div>
                </StyledTaskTitle>
              );
            })}
          </div>
        );
      })}
    </StyledTaskTile>
  );
};

export default BoardContent;
