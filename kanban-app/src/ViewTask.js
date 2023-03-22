import styled from "styled-components";
import { useState } from "react";
import Modal from "./Modal";
import Checkbox from "./Atoms/Checkbox";
import SelectBox from "./Atoms/Selectbox";
import { ReactComponent as EllipsisSvg } from "./assets/icon-vertical-ellipsis.svg";

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
  zindex: 10;
  right: 1px;
  background-color: #635fc7;
  color: white;
  padding: 20px;
`;

const ViewTask = ({
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

  const deleteTask = (e) => {
    deleteTaskFunc(e, taskIndex, column);
    setShowEllipsisModal(false);
  };

  const editTask = (e) => {
    editTaskFunc(e, taskIndex, column, selectedTask);
    setShowEllipsisModal(false);
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
              <div onClick={deleteTask} style={{ marginBottom: "10px" }}>
                Delete Task
              </div>
              <div onClick={editTask}>Edit Task</div>
            </StyledEllipsisModal>
          ) : null}
        </StyledEllipsisContainer>
        <StyledTitle>{selectedTask.title}</StyledTitle>
        <StyledDescription>{selectedTask.description}</StyledDescription>
        <div>
          <div>
            Subtasks {calculateCompletedSubtaskCallback(selectedTask.subtasks)}{" "}
            of {selectedTask.subtasks.length}
          </div>
          {selectedTask.subtasks.map((ele, index) => {
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
              defaultValue={selectedTask.status}
              defaultName={selectedTask.status}
            />
          </div>
        </div>
      </StyledTaskContainer>
    </Modal>
  ) : null;
};

export default ViewTask;
