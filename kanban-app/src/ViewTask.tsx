import styled from "styled-components";
import { ReactNode, useState } from "react";
import Modal from "./Modal";
import Checkbox from "./Atoms/Checkbox";
import SelectBox from "./Atoms/Selectbox";
import { ReactComponent as EllipsisSvg } from "./assets/icon-vertical-ellipsis.svg";
import { Column, Subtask, Task } from "./types";

const StyledTaskContainer = styled.div`
  background: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 400px;
`;

const StyledCloseLink = styled.div`
  cursor: pointer;
  width: 20px;
`;

const StyledTitle = styled.div`
  margin-bottom: 10px;
`;

const StyledDescription = styled.div`
  margin-bottom: 10px;
`;

const StyledCheckboxContainer = styled.div`
  background: #e4ebfa;
  margin-bottom: 5px;
  padding: 5px;
`;

const StyledEllipsisContainer = styled.div`
  align-self: end;
  position: relative;
`;

const StyledEllipsisModal = styled.div`
  position: absolute;
  z-index: 10;
  left: 1px;
  padding: 20px;
  width: max-content;
  background: white;
  border-radius: 15px;
`;

const StyledEditTask = styled.button`
  color: #635fc7;
`;

const StyledDeleteTask = styled.button`
  color: #ea5555;
  margin-bottom: 10px;
`;

interface TaskView {
  selectedTask: Task | null;
  calculateCompletedSubtaskCallback: (subtasks: Subtask[] | undefined) => void;
  showModal: boolean;
  setShowModal: (args: boolean) => void;
  deleteTaskFunc: (
    e: React.MouseEvent<HTMLButtonElement>,
    taskIndex: number,
    column: Column
  ) => void;
  editTaskFunc: (
    e: React.MouseEvent<HTMLButtonElement>,
    taskIndex: number,
    column: Column,
    selectedTask: Task
  ) => void;
  column: Column | null;
  taskIndex: number;
}

const ViewTask: React.FC<TaskView> = ({
  selectedTask,
  calculateCompletedSubtaskCallback,
  showModal,
  setShowModal,
  deleteTaskFunc,
  editTaskFunc,
  column,
  taskIndex,
}) => {
  const [showEllipsisModal, setShowEllipsisModal] = useState(false);

  const deleteTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (column !== null) {
      deleteTaskFunc(e, taskIndex, column);
      setShowEllipsisModal(false);
    }
  };

  const editTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (column !== null && selectedTask !== null) {
      editTaskFunc(e, taskIndex, column, selectedTask);
      setShowEllipsisModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowEllipsisModal(false);
  };

  return showModal ? (
    <Modal>
      <StyledTaskContainer>
        <StyledCloseLink onClick={closeModal}>X</StyledCloseLink>
        <StyledEllipsisContainer
          onClick={() => setShowEllipsisModal(!showEllipsisModal)}
        >
          <EllipsisSvg />
          {showEllipsisModal ? (
            <StyledEllipsisModal>
              <StyledDeleteTask onClick={deleteTask}>
                Delete Task
              </StyledDeleteTask>
              <StyledEditTask onClick={editTask}>Edit Task</StyledEditTask>
            </StyledEllipsisModal>
          ) : null}
        </StyledEllipsisContainer>
        <StyledTitle>{selectedTask?.title}</StyledTitle>
        <StyledDescription>{selectedTask?.description}</StyledDescription>
        <div>
          <div>
            Subtasks{" "}
            {
              calculateCompletedSubtaskCallback(
                selectedTask?.subtasks
              ) as ReactNode
            }{" "}
            of {selectedTask?.subtasks.length}
          </div>
          {selectedTask?.subtasks.map((ele: Subtask) => {
            return (
              <StyledCheckboxContainer>
                <Checkbox
                  textLabel={ele.title}
                  strikeThrough={true}
                  checkedState={ele.isCompleted}
                />
              </StyledCheckboxContainer>
            );
          })}
        </div>
        <div>
          <div>Status</div>
          <div>
            <SelectBox
              defaultValue={selectedTask?.status}
              defaultName={selectedTask?.status}
            />
          </div>
        </div>
      </StyledTaskContainer>
    </Modal>
  ) : null;
};

export default ViewTask;
