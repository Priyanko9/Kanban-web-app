import { useContext, useState } from "react";
import styled from "styled-components";
import { BoardContext } from "./BoardContext";
import Modal from "./Modal";
import { ThemeContext } from "./App";
import Textbox from "./Atoms/Input";

const StyledContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
`;

const StyledButton = styled.button`
  width: 90%;
  background: ${(props) =>
    props.isSecondary
      ? props.theme.button.secondary.bgcolor
      : props.theme.button.primary.bgcolor};
  border-radius: 25px;
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
  margin-top: 10px;
  color: white;
  border: 1px solid
    ${(props) =>
      props.isSecondary
        ? props.theme.button.secondary.bgcolor
        : props.theme.button.primary.bgcolor};
`;

const StyledInputContainer = styled.div`
  margin-top: 10px;
`;

const StyledCloseModal = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const AddNewBoard = ({ addBoardModal, setAddBoardModal }) => {
  const [columns, setColumns] = useState([]);
  const [boardName, setBoardName] = useState("");
  const contextValue = useContext(BoardContext);
  const { createNewBoard } = contextValue;
  const { theme } = useContext(ThemeContext);

  const addNewColumn = () => {
    columns.push({ name: "", tasks: [] });
    setColumns([...columns]);
  };

  const addColumnName = (name) => {
    columns[columns.length - 1].name = name;
  };

  const removeColumn = (index) => {
    columns.splice(index, 1);
    setColumns([...columns]);
  };

  const createNewBoardFunc = () => {
    createNewBoard({
      name: boardName,
      columns,
    });
    setAddBoardModal(false);
    setColumns([]);
  };

  return addBoardModal ? (
    <Modal>
      <StyledContainer>
        <h3>Add New Board</h3>
        <div>
          <label>Name</label>
          <StyledInputContainer>
            <Textbox onChange={(e) => setBoardName(e.target.value)} />
          </StyledInputContainer>
        </div>
        <div>
          <label>Columns</label>
          {columns.map((col, i) => {
            return (
              <div>
                <span>
                  <Textbox onChange={(e) => addColumnName(e.target.value)} />
                </span>
                <span onClick={() => removeColumn(i)}>X</span>
              </div>
            );
          })}
        </div>
        <StyledButton onClick={addNewColumn} theme={theme} isSecondary>
          + Add New Column
        </StyledButton>
        <StyledButton onClick={createNewBoardFunc} theme={theme}>
          Create New Board
        </StyledButton>
        <StyledCloseModal onClick={() => setAddBoardModal(false)}>
          X
        </StyledCloseModal>
      </StyledContainer>
    </Modal>
  ) : null;
};

export default AddNewBoard;
