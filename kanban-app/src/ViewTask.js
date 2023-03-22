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
  align-self: end;
  cursor: pointer;
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
  position: relative;
  margin-left: 45px;
  right: 20px;
  top: 7px;
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
  return showModal ? (
    <Modal>
      <StyledTaskContainer>
        <StyledCloseLink onClick={() => setShowModal(false)}>X</StyledCloseLink>
        <StyledEllipsisContainer
          onClick={() => setShowEllipsisModal(!showEllipsisModal)}
        >
          <EllipsisSvg />
          {showEllipsisModal ? (
            <StyledEllipsisModal>
              <div
                onClick={(e) => deleteTaskFunc(e, taskIndex, column)}
                style={{ marginBottom: "10px" }}
              >
                Delete Task
              </div>
              <div
                onClick={(e) =>
                  editTaskFunc(e, taskIndex, column, selectedTask)
                }
              >
                Edit Task
              </div>
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
