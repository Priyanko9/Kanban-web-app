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

const DeleteBoardModal: React.FC<{
  setShowDeleteBoardModal: (args: boolean) => void;
  showDeleteBoardModal: boolean;
}> = ({ setShowDeleteBoardModal, showDeleteBoardModal }) => {
  const boardContext = useContext(BoardContext);
  const themeCtxt = useContext(ThemeContext);

  const deleteBoard = () => {
    if (boardContext !== null) {
      const { deleteBoard: deleteBoardFunc } = boardContext;
      deleteBoardFunc();
    }
    setShowDeleteBoardModal(false);
  };
  if (themeCtxt !== null) {
    const { theme } = themeCtxt;

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
  }
  return null;
};

export default DeleteBoardModal;
