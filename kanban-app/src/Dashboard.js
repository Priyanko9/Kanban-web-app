import styled from "styled-components";
import { useState, useContext } from "react";
import { ThemeContext } from "./App";
import { ReactComponent as BoardSvg } from "./assets/icon-board.svg";
import useResponseData from "./useResponseData";
import BoardsSidebar from "./BoardsSidebar";
import BoardColumns from "./BoardColumns";
import BoardContent from "./BoardContent";
import AddNewTask from "./AddNewTask";
import DeleteBoardModal from "./DeleteBoardModal";

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
  const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false);

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
          <div onClick={() => setShowDeleteBoardModal(true)}>Delete Board</div>
        </StyledHeader>
        <BoardContent />
      </div>
      <AddNewTask
        setShowAddModal={setShowAddModal}
        showAddModal={showAddModal}
      />
      <DeleteBoardModal
        showDeleteBoardModal={showDeleteBoardModal}
        setShowDeleteBoardModal={setShowDeleteBoardModal}
      />
    </StyledContainer>
  );
};

export default Dashboard;
