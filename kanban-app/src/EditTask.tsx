import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { BoardContext } from "./BoardContext";
import Textbox from "./Atoms/Input";
import SelectBox from "./Atoms/Selectbox";
import Button from "./Atoms/Button";
import { ThemeContext } from "./App";
import { EditData, Task } from "./types";

const StyledContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  display: flex;
  flex-direction: column;
`;

const StyledTextboxContainer = styled.div`
  background: #e4ebfa;
  margin-bottom: 5px;
  padding: 5px;
`;

const StyledCloseButton = styled.div`
  align-self: end;
  cursor: pointer;
`;

interface EditTask {
  showEditModal: boolean;
  selectedTask: Task | null;
  editData: EditData | null;
  calculateStatusArray: () => {};
  setShowEditModal: (args: boolean) => void;
}

const EditTask: React.FC<EditTask> = ({
  showEditModal,
  selectedTask: currentTask,
  editData,
  calculateStatusArray,
  setShowEditModal,
}) => {
  const [status, setStatus] = useState("");
  const statusList = calculateStatusArray();
  const boardContextValue = useContext(BoardContext);

  const themeContextValue = useContext(ThemeContext);

  const [selectedTask, setCurrentTask] = useState<Task | null>(null););

  useEffect(() => {
    setCurrentTask(currentTask);
  }, [currentTask]);

  const removeColumn = (index: number) => {
    if (selectedTask !== null && selectedTask !== undefined) {
      selectedTask.subtasks.splice(index, 1);
      setCurrentTask({ ...selectedTask });
    }
  };

  const closeModal = () => {
    setShowEditModal(false);
  };

  const saveTaskChanges = () => {
    if (boardContextValue != null) {
      const { editTask } = boardContextValue;
      editTask({
        ...editData,
        newColumn: status,
        selectedTaskObj: selectedTask,
      });
      closeModal();
    }
  };

  if (themeContextValue != null) {
    const { theme } = themeContextValue;

    return showEditModal ? (
      <Modal>
        <StyledContainer>
          <StyledCloseButton onClick={closeModal}>X</StyledCloseButton>
          <div style={{ marginBottom: "10px" }}>
            <Textbox
              value={selectedTask?.title}
              onChange={(e) =>
                setCurrentTask({ ...selectedTask, title: e.target.value })
              }
            />
          </div>
          {selectedTask.description && (
            <div style={{ marginBottom: "10px" }}>
              <textarea
                style={{
                  marginBottom: "10px",
                  width: "300px",
                  height: "100px",
                }}
                value={selectedTask.description}
                onChange={(e) =>
                  setCurrentTask({
                    ...selectedTask,
                    description: e.target.value,
                  })
                }
              />
            </div>
          )}
          <div>
            <div>Subtasks</div>
            {selectedTask?.subtasks?.map((ele, index) => {
              return (
                <StyledTextboxContainer key={ele.title}>
                  <span>
                    <Textbox value={ele.title} />
                  </span>
                  <span onClick={() => removeColumn(index)}>X</span>
                </StyledTextboxContainer>
              );
            })}
          </div>
          <div>Status</div>
          <div>
            <SelectBox
              onChange={(e) => setStatus(e.target.value)}
              defaultValue={selectedTask.status}
              defaultName={selectedTask.status}
              optionList={statusList}
            />
          </div>
          <Button onClick={saveTaskChanges} theme={theme}>
            Save
          </Button>
        </StyledContainer>
      </Modal>
    ) : null;
  }
};

export default EditTask;
