import styled from "styled-components";
import { useState, useContext } from "react";
import { ThemeContext } from "./App";
import { ReactComponent as EllipsisSvg } from "./assets/icon-vertical-ellipsis.svg";

import useResponseData from "./useResponseData";
import BoardsSidebar from "./BoardsSidebar";
import BoardContent from "./BoardContent";
import AddNewTask from "./AddNewTask";
import DeleteBoardModal from "./DeleteBoardModal";
import EditBoardModal from "./EditBoard";

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

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false);
  const [showEllipsisModal, setShowEllipsisModal] = useState(false);

  return (
    <StyledContainer>
      <div style={{ borderRight: "0.1px solid grey" }}>
        <BoardsSidebar />
      </div>
      <div style={{ width: "100%" }}>
        <StyledHeader>
          <div>Dashboard Header</div>
          <div style={{ display: "flex" }}>
            <div
              onClick={() => setShowAddModal(true)}
              style={{
                backgroundColor: "#635FC7",
                color: "white",
                borderRadius: "25px",
                padding: "10px",
                fontSize: "14px",
              }}
            >
              + Add New Task
            </div>

            <div
              onClick={() => setShowEllipsisModal(!showEllipsisModal)}
              style={{
                position: "relative",
                marginLeft: "45px",
                right: "20px",
                top: "7px",
              }}
            >
              <EllipsisSvg />
              {showEllipsisModal ? (
                <div
                  style={{
                    position: "absolute",
                    zIndex: "10",
                    right: "1px",
                    backgroundColor: "#635FC7",
                    color: "white",
                    padding: "20px",
                  }}
                >
                  <div
                    onClick={() => setShowDeleteBoardModal(true)}
                    style={{ marginBottom: "10px" }}
                  >
                    Delete
                  </div>
                  <div onClick={() => setShowEditModal(true)}>Edit</div>
                </div>
              ) : null}
            </div>
          </div>
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
