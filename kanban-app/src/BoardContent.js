import styled from "styled-components";
import { useContext, useState, useCallback } from "react";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { ThemeContext } from "./App";
import { BoardContext } from "./BoardContext";
import ViewTask from "./ViewTask";
import EditTask from "./EditTask";

const getBgColor = (name) => {
  if (name === "Todo") {
    return "#49c4e5";
  } else if (name === "Doing") {
    return "#8471F2";
  } else if (name === "Done") {
    return "#67E2AE";
  }
};

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

const StyledColumnName = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const StyledSignal = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 25px;
  background-color: ${(props) => getBgColor(props.name)};
  margin-right: 5px;
`;

const StyledColumnContainer = styled.div`
  margin-left: 10px;
  width: 33%;
  padding-left: 10px;
  ${(props) =>
    props.snapshot.isDraggingOver ? `border:1px dashed #8471F2` : ``};
`;

const StyledTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSubTask = styled.div`
  font-size: 11px;
  margin-top: 10px;
`;

const StyledEdit = styled.div`
  margin-top: 10px;
`;

const calculateCompletedSubtask = (subtasks) => {
  let count = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      count++;
    }
  });
  return count;
};

const BoardContent = () => {
  const { theme } = useContext(ThemeContext);
  const contextValue = useContext(BoardContext);
  const { state, editTask, deleteTask } = contextValue;
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [editData, setEditData] = useState({});
  const [selectedColumn, setSelectedColumn] = useState({});

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
  const mouseDown = (task, column) => {
    setSelectedTask(task);
    setSelectedColumn(column);
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

  const deleteTaskFunc = (e, index, column) => {
    e.stopPropagation();
    deleteTask({
      selectedTaskIndex: index,
      selectedBoardName: selectedBoard.name,
      selectedColumn: column,
    });
    localStorage.setItem("appState", JSON.stringify(state));
  };

  const editTaskFunc = (e, index, column, task) => {
    e.stopPropagation();
    setSelectedTask(task);
    onTaskEdit({
      selectedTaskIndex: index,
      selectedBoardName: selectedBoard.name,
      selectedColumn: column,
      selectedTaskObj: task,
    });
  };

  const dragEnd = (result) => {
    const { destination, source } = result;
    console.log("result:", result);
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }
    editTask({
      selectedTaskIndex: Number(source.index),
      selectedBoardName: selectedBoard.name,
      selectedColumn: selectedColumn,
      selectedTaskObj: selectedTask,
      newColumn: destination.droppableId,
    });
    localStorage.setItem("appState", JSON.stringify(state));
    setSelectedTask({});
    setSelectedColumn({});
  };

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
      <DragDropContext onDragEnd={dragEnd}>
        <StyledTaskTile theme={theme}>
          {selectedBoard?.columns?.map((column, i) => {
            return (
              <Droppable droppableId={column.name} index={i}>
                {(provided, snapshot) => (
                  <StyledColumnContainer
                    key={column.name}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    snapshot={snapshot}
                  >
                    <StyledColumnName>
                      <StyledSignal name={column.name} />
                      <div>
                        {column.name} ({column?.tasks.length})
                      </div>
                    </StyledColumnName>
                    {column?.tasks?.map((task, index) => {
                      const completedTask = calculateCompletedSubtask(
                        task.subtasks
                      );
                      return (
                        <Draggable
                          draggableId={task.title}
                          index={index}
                          key={task.title}
                        >
                          {(provided) => (
                            <StyledTaskTitle
                              onClick={() => onTaskClick(task)}
                              onMouseDown={() => mouseDown(task, column)}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              key={task.title}
                            >
                              <StyledTaskContainer>
                                <div>
                                  <b>{task.title}</b>
                                </div>
                                <StyledSubTask>
                                  {completedTask} of {task.subtasks.length}{" "}
                                  subtasks
                                </StyledSubTask>
                                <StyledEdit
                                  onClick={(e) =>
                                    editTaskFunc(e, index, column, task)
                                  }
                                >
                                  Edit
                                </StyledEdit>
                              </StyledTaskContainer>
                              <div
                                onClick={(e) =>
                                  deleteTaskFunc(e, index, column)
                                }
                              >
                                X
                              </div>
                            </StyledTaskTitle>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </StyledColumnContainer>
                )}
              </Droppable>
            );
          })}
        </StyledTaskTile>
      </DragDropContext>
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
