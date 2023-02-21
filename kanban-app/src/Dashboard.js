import styled from "styled-components";
import { useState, useContext } from "react";
import { ThemeContext } from "./App";
import { ReactComponent as BoardSvg } from "./assets/icon-board.svg";
import useResponseData from "./useResponseData";
import BoardsSidebar from "./BoardsSidebar";
import BoardContent from "./BoardContent";
import AddNewTask from "./AddNewTask";
import DeleteBoardModal from "./DeleteBoardModal";
import EditBoardModal from "./EditBoard";

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
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false);

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
          <div onClick={() => setShowEditModal(true)}>Edit Board</div>
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
      <EditBoardModal
        editBoardModal={showEditModal}
        setEditBoardModal={setShowEditModal}
      />
    </StyledContainer>
  );
};

export default Dashboard;
