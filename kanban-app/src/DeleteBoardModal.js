import styled from "styled-components";
import { useContext, useState } from "react";
import Modal from "./Modal";
import { BoardContext } from "./BoardContext";

const StyledContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const StyledButton = styled.button`
  width: 90%;
  background: silver;
  border-radius: 25px;
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
  margin-top: 10px;
`;

const DeleteBoardModal = ({
  setShowDeleteBoardModal,
  showDeleteBoardModal,
}) => {
  const { deleteBoard: deleteBoardFunc } = useContext(BoardContext);
  const deleteBoard = () => {
    deleteBoardFunc();
    setShowDeleteBoardModal(false);
  };

  return showDeleteBoardModal ? (
    <Modal>
      <StyledContainer>
        <div>Delete this board ?</div>
        <div>
          Are you sure you want to delete this board? This action will remove
          all columns and tasks and cannot be reversed.
        </div>
        <div>
          <StyledButton onClick={() => deleteBoard()}>Delete</StyledButton>
          <StyledButton onClick={() => setShowDeleteBoardModal(false)}>
            Cancel
          </StyledButton>
        </div>
      </StyledContainer>
    </Modal>
  ) : null;
};

export default DeleteBoardModal;
