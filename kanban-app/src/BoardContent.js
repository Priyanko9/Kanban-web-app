import styled from "styled-components";
import { useContext, useState } from "react";
import { backendData } from "./data";
import { ThemeContext } from "./App";
import { BoardContext } from "./BoardContext";
import Modal from "./Modal";
import Checkbox from "./Checkbox/Checkbox";

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

const calculateCompletedSubtask = (subtasks) => {
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
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const { selectedBoard } = state;
  if (selectedBoard?.columns.length === 0) {
    return (
      <div>
        <div>The Board is empty.Create a new column to get started</div>
        <div>+ Add New Column</div>
      </div>
    );
  }
  const onTaskClick = (task) => {
    setShowModal(true);
    setSelectedTask(task);
  };
  return (
    <div>
      <StyledTaskTile theme={theme}>
        {selectedBoard.columns.map((column, i) => {
          return (
            <div style={{ marginLeft: "10px" }}>
              <div>{column.name}</div>
              {column.tasks.map((task, index) => {
                const completedTask = calculateCompletedSubtask(task.subtasks);
                return (
                  <StyledTaskTitle onClick={() => onTaskClick(task)}>
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
      {showModal ? (
        <Modal>
          <div
            style={{
              background: "white",
              padding: "20px",
              position: "relative",
            }}
          >
            <div style={{ marginBottom: "10px" }}>{selectedTask.title}</div>
            <div style={{ marginBottom: "10px" }}>
              {selectedTask.description}
            </div>
            <div>
              <div>
                Subtasks {calculateCompletedSubtask(selectedTask.subtasks)} of{" "}
                {selectedTask.subtasks.length}
              </div>
              {selectedTask.subtasks.map((ele, index) => {
                return (
                  <div
                    style={{
                      background: "#E4EBFA",
                      marginBottom: "5px",
                      padding: "5px",
                    }}
                  >
                    <Checkbox
                      textLabel={ele.title}
                      strikeThrough={true}
                      checkedState={ele.isCompleted}
                    />
                  </div>
                );
              })}
            </div>
            <div>
              <div>Status</div>
              <div>
                <select style={{ padding: "5px", width: "100%" }}>
                  <option>{selectedTask.status}</option>
                </select>
              </div>
            </div>
            <div
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                /* align-self: flex-end; */
                top: "10px",
                right: "10px",
              }}
            >
              X
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default BoardContent;
