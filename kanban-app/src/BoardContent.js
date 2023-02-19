import styled from "styled-components";
import { useContext, useState, useCallback } from "react";
import { ThemeContext } from "./App";
import { BoardContext } from "./BoardContext";
import ViewTask from "./ViewTask";
import EditTask from "./EditTask";

const StyledTaskTitle = styled.div`
  padding: 20px;
  width: 70%;
  background: white;
  margin-bottom: 10px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
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
  const contextValue = useContext(BoardContext);
  const { state, editTask, deleteTask } = contextValue;
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [editData, setEditData] = useState({});

  const { selectedBoard } = state || {};

  const calculateStatusArray = () => {
    const statusList = [];
    selectedBoard?.columns.forEach((column, i) => {
      statusList.push(column.name);
    });
    return statusList;
  };
  const onTaskClick = (task) => {
    setShowModal(true);
    setSelectedTask(task);
  };
  const onTaskEdit = ({
    selectedTaskIndex,
    selectedBoardName,
    selectedColumn,
    selectedTaskObj,
  }) => {
    setShowEditModal(true);

    setEditData({
      selectedTaskIndex,
      selectedBoardName,
      selectedColumn,
      selectedTaskObj,
    });
  };
  const calculateCompletedSubtaskCallback = useCallback((subtasks) => {
    calculateCompletedSubtask(subtasks);
  }, []);

  if (selectedBoard?.columns.length === 0) {
    return (
      <div>
        <div>The Board is empty.Create a new column to get started</div>
        <div>+ Add New Column</div>
      </div>
    );
  }
  return (
    <div>
      <StyledTaskTile theme={theme}>
        {selectedBoard?.columns?.map((column, i) => {
          return (
            <div style={{ marginLeft: "10px", width: "33%" }}>
              <div>{column.name}</div>
              {column?.tasks?.map((task, index) => {
                const completedTask = calculateCompletedSubtask(task.subtasks);
                return (
                  <StyledTaskTitle onClick={() => onTaskClick(task)}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>{task.title}</div>
                      <div style={{ fontSize: "11px", marginTop: "10px" }}>
                        {completedTask} of {task.subtasks.length} subtasks
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTask(task);
                          onTaskEdit({
                            selectedTaskIndex: index,
                            selectedBoardName: selectedBoard.name,
                            selectedColumn: column,
                            selectedTaskObj: task,
                          });
                        }}
                        style={{ marginTop: "10px" }}
                      >
                        Edit
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        deleteTask({
                          selectedTaskIndex: index,
                          selectedBoardName: selectedBoard.name,
                          selectedColumn: column,
                        });
                        localStorage.setItem("appState", JSON.stringify(state));
                      }}
                    >
                      X
                    </div>
                  </StyledTaskTitle>
                );
              })}
            </div>
          );
        })}
      </StyledTaskTile>
      <ViewTask
        calculateCompletedSubtaskCallback={calculateCompletedSubtaskCallback}
        selectedTask={selectedTask}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <EditTask
        showEditModal={showEditModal}
        selectedTask={selectedTask}
        editData={editData}
        calculateStatusArray={calculateStatusArray}
        editTask={editTask}
        setShowEditModal={setShowEditModal}
      />
    </div>
  );
};

export default BoardContent;
