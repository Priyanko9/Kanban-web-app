import styled from "styled-components";
import { useContext, useState, useCallback } from "react";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { ThemeContext } from "./App";
import { BoardContext } from "./BoardContext";
import ViewTask from "./ViewTask";
import EditTask from "./EditTask";
import {Task,Column,Board,Subtask} from "./types";

const getBgColor = (name:string) => {
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

interface SignalProps{
  name: string;
}
const StyledSignal = styled.div<SignalProps>`
  width: 10px;
  height: 10px;
  border-radius: 25px;
  background-color: ${(props) => getBgColor(props.name)};
  margin-right: 5px;
`;

interface ColumnContainer{
  snapshot :{
    isDraggingOver:boolean
  }
}
const StyledColumnContainer = styled.div<ColumnContainer>`
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

const calculateCompletedSubtask = (subtasks:Subtask[]) => {
  let count = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      count++;
    }
  });
  return count;
};

const BoardContent = () => {
  const ThemeContextValue = useContext(ThemeContext);
 
  const contextValue = useContext(BoardContext);
  
  
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [editData, setEditData] = useState({});
  const [selectedColumn, setSelectedColumn] = useState({});
  const [taskIndex, setTaskIndex] = useState(0);

  const calculateCompletedSubtaskCallback = useCallback((subtasks:Subtask[]) => {
    calculateCompletedSubtask(subtasks);
  }, []);
  if(contextValue !==null && ThemeContextValue!==null){
    const { state, editTask, deleteTask } = contextValue;
    const { selectedBoard } = state || {};
   

    const calculateStatusArray = () => {
      const statusList:Array<string> = [];
      selectedBoard?.columns?.forEach((column, i) => {
        statusList.push(column.name);
      });
      return statusList;
    };
    const onTaskClick = (task:Task, column:Column, index:number) => {
      setShowModal(true);
      setSelectedTask(task);
      setSelectedColumn(column);
      setTaskIndex(index);
    };
    const mouseDown = (task:Task, column:Column) => {
      setSelectedTask(task);
      setSelectedColumn(column);
    };
    
    const onTaskEdit = ({
      selectedTaskIndex,
      selectedBoardName,
      selectedColumn,
      selectedTaskObj,
    }:{
      selectedTaskIndex: number;
      selectedBoardName:string;
      selectedColumn:Column;
      selectedTaskObj:Task;
    }) => {
      setShowEditModal(true);

      setEditData({
        selectedTaskIndex,
        selectedBoardName,
        selectedColumn,
        selectedTaskObj,
      });
    };
    

    const deleteTaskFunc = (e:React.MouseEvent<HTMLButtonElement>, index:number, column:Column) => {
      e.stopPropagation();
      deleteTask({
        selectedTaskIndex: index,
        selectedBoardName: selectedBoard?.name,
        selectedColumn: column,
      });
      setShowModal(false);
    };

    const editTaskFunc = (e, index, column, task) => {
      e.stopPropagation();
      setSelectedTask(task);
      onTaskEdit({
        selectedTaskIndex: index,
        selectedBoardName: selectedBoard?.name,
        selectedColumn: column,
        selectedTaskObj: task,
      });
      setShowModal(false);
    };

    const dragEnd = (result) => {
      const { destination, source } = result;

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
  const {theme}=ThemeContextValue;
  return (
    <div>
      <DragDropContext onDragEnd={dragEnd}>
        <StyledTaskTile theme={theme}>
          {selectedBoard?.columns?.map((column, i) => {
            return (
              <Droppable droppableId={column.name} index={i} key={column.name}>
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
                              onClick={() => onTaskClick(task, column, index)}
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
                              </StyledTaskContainer>
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
        taskIndex={taskIndex}
        column={selectedColumn}
        editTaskFunc={editTaskFunc}
        deleteTaskFunc={deleteTaskFunc}
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
        }
};

export default BoardContent;
