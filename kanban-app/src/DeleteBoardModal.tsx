import styled from "styled-components";
import { useContext } from "react";
import Modal from "./Modal";
import { BoardContext } from "./BoardContext";
import Button from "./Atoms/Button";
import { ThemeContext } from "./App";

const StyledContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
`;

const DeleteBoardModal = ({
  setShowDeleteBoardModal,
  showDeleteBoardModal,
}) => {
  const { deleteBoard: deleteBoardFunc } = useContext(BoardContext);
  const { theme } = useContext(ThemeContext);

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
        <StyledButtonContainer>
          <Button onClick={() => deleteBoard()} theme={theme} isDestructive>
            Delete
          </Button>
          <Button
            onClick={() => setShowDeleteBoardModal(false)}
            theme={theme}
            isSecondary
          >
            Cancel
          </Button>
        </StyledButtonContainer>
      </StyledContainer>
    </Modal>
  ) : null;
};

export default DeleteBoardModal;
