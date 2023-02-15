import styled from "styled-components";
import { useState, useContext } from "react";
import { ThemeContext } from "./App";
import { ReactComponent as BoardSvg } from "./assets/icon-board.svg";
import useResponseData from "./useResponseData";
import BoardsSidebar from "./BoardsSidebar";
import BoardColumns from "./BoardColumns";
import BoardContent from "./BoardContent";
import Modal from "./Modal";
import { BoardContext } from "./BoardContext";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Dashboard = () => {
  const response = useResponseData();
  const [showAddModal, setShowAddModal] = useState(false);
  const { addNewTask } = useContext(BoardContext);
  console.log("response dashboard:", response);
  return (
    <StyledContainer>
      <div>
        <BoardsSidebar />
        <div>Content</div>
      </div>
      <div style={{ width: "100%" }}>
        <StyledHeader>
          <div>Dashboard Header</div>
          <div onClick={() => setShowAddModal(true)}>+ Add New Task</div>
        </StyledHeader>
        <BoardContent />
      </div>
      {showAddModal ? (
        <Modal>
          <div style={{ width: "200px", background: "white", padding: "20px" }}>
            <div>
              <label>Title</label>
              <br />
              <input type="text" />
            </div>
            <div>
              <label>Description</label>
              <textarea />
            </div>
            <div>
              <label>Subtasks</label>
              <div>
                <input type="text" />
                <span>X</span>
              </div>
              <button>Create New Subtask</button>
            </div>
            <div>
              <div>Status</div>
              <div>
                <select style={{ padding: "5px", width: "100%" }}>
                  <option>Todo</option>
                </select>
              </div>
            </div>
            <button
              onClick={() =>
                addNewTask({
                  title: "abc",
                  description: "dhsjhsdkjfkdfdkj",
                  status: "Todo",
                  subtasks: [{ title: "sub-one", isCompleted: false }],
                })
              }
            >
              Create Task
            </button>
            <div onClick={() => setShowAddModal(false)}>close modal</div>
          </div>
        </Modal>
      ) : null}
    </StyledContainer>
  );
};

export default Dashboard;
