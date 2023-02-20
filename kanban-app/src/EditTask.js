import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { BoardContext } from "./BoardContext";

const StyledInput = styled.input`
  width: 300px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  height: 25px;
`;

const StyledContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const EditTask = ({
  showEditModal,
  selectedTask: currentTask,
  editData,
  calculateStatusArray,
  setShowEditModal,
}) => {
  const [status, setStatus] = useState("");
  const statusList = calculateStatusArray();
  const contextValue = useContext(BoardContext);
  const { state, editTask } = contextValue;

  const [selectedTask, setCurrentTask] = useState({});

  useEffect(() => {
    setCurrentTask(currentTask);
  }, [currentTask]);

  const removeColumn = (index) => {
    selectedTask.subtasks.splice(index, 1);
    setCurrentTask({ ...selectedTask });
  };

  return showEditModal ? (
    <Modal>
      <StyledContainer>
        <div style={{ marginBottom: "10px" }}>{selectedTask.title}</div>
        <div style={{ marginBottom: "10px" }}>{selectedTask.description}</div>
        <div>
          <div>Subtasks</div>
          {selectedTask?.subtasks?.map((ele, index) => {
            return (
              <div
                style={{
                  background: "#E4EBFA",
                  marginBottom: "5px",
                  padding: "5px",
                }}
              >
                <span>
                  <StyledInput type="text" value={ele.title} />
                </span>
                <span onClick={() => removeColumn(index)}>X</span>
              </div>
            );
          })}
        </div>
        <div>Status</div>
        <div>
          <select
            style={{ padding: "5px", width: "100%" }}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={selectedTask.status}>{selectedTask.status}</option>
            {statusList?.map((ele, i) => (
              <option value={ele}>{ele}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => {
            editTask({
              ...editData,
              newColumn: status,
              selectedTaskObj: selectedTask,
            });
            setShowEditModal(false);
            localStorage.setItem("appState", JSON.stringify(state));
          }}
        >
          Save
        </button>
      </StyledContainer>
    </Modal>
  ) : null;
};

export default EditTask;
