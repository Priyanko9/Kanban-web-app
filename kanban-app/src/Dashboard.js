import styled from "styled-components";
import { useState, useContext } from "react";
import { ThemeContext } from "./App";
import { ReactComponent as EllipsisSvg } from "./assets/icon-vertical-ellipsis.svg";
import { BoardContext } from "./BoardContext";
import BoardsSidebar from "./BoardsSidebar";
import BoardContent from "./BoardContent";
import AddNewTask from "./AddNewTask";
import DeleteBoardModal from "./DeleteBoardModal";
import EditBoardModal from "./EditBoard";
import Button from "./Atoms/Button";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  padding-top: 10px;
`;

const StyledSidebar = styled.div`
  border-right: 0.1px solid grey;
  padding-right: 20px;
`;

const StyledMainContainer = styled.div`
  width: 100%;
`;

const StyledBoardName = styled.div`
  padding: 10px;
`;

const StyledEllipsisContainer = styled.div`
  position: relative;
  margin-left: 45px;
  right: 20px;
  top: 7px;
  cursor: pointer;
`;

const StyledEllipsisModal = styled.div`
  position: absolute;
  zindex: 10;
  right: 1px;
  background-color: white;
  color: white;
  padding: 20px;
  border-radius: 15px;
  width: max-content;
`;

const StyledBoardFunctions = styled.div`
  display: flex;
`;

const StyledEditTask = styled.div`
  color: #635fc7;
`;

const StyledDeleteTask = styled.div`
  color: #ea5555;
  margin-bottom: 10px;
`;

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false);
  const [showEllipsisModal, setShowEllipsisModal] = useState(false);
  const {
    state: { selectedBoard },
  } = useContext(BoardContext);

  const { theme } = useContext(ThemeContext);

  return (
    <StyledContainer>
      <StyledSidebar>
        <BoardsSidebar />
      </StyledSidebar>
      <StyledMainContainer>
        <StyledHeader>
          <StyledBoardName>{selectedBoard?.name}</StyledBoardName>
          <StyledBoardFunctions>
            <Button theme={theme} onClick={() => setShowAddModal(true)}>
              + Add New Task
            </Button>

            <StyledEllipsisContainer
              onClick={() => setShowEllipsisModal(!showEllipsisModal)}
            >
              <EllipsisSvg />
              {showEllipsisModal ? (
                <StyledEllipsisModal>
                  <StyledDeleteTask
                    onClick={() => setShowDeleteBoardModal(true)}
                  >
                    Delete Board
                  </StyledDeleteTask>
                  <StyledEditTask onClick={() => setShowEditModal(true)}>
                    Edit Board
                  </StyledEditTask>
                </StyledEllipsisModal>
              ) : null}
            </StyledEllipsisContainer>
          </StyledBoardFunctions>
        </StyledHeader>
        <BoardContent />
      </StyledMainContainer>
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
