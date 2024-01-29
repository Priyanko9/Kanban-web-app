import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BoardContext } from "./BoardContext";
import Modal from "./Modal";
import { ThemeContext } from "./App";
import Textbox from "./Atoms/Input";
import Button from "./Atoms/Button";
import { Column } from "./types";

const StyledContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
`;

const StyledInputContainer = styled.div`
  margin-top: 10px;
`;

const StyledCloseModal = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

interface AddNewBoardProps {
  addBoardModal: boolean;
  setAddBoardModal: (s: boolean) => void;
}

const AddNewBoard: React.FC<AddNewBoardProps> = ({
  addBoardModal,
  setAddBoardModal,
}) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [boardName, setBoardName] = useState("");
  const contextValue = useContext(BoardContext);

  const ThemeContextValue = useContext(ThemeContext);

  const addNewColumn = () => {
    columns.push({ name: "", tasks: [] });
    setColumns([...columns]);
  };

  const addColumnName = (name: string) => {
    columns[columns.length - 1].name = name;
  };

  const removeColumn = (index: number) => {
    columns.splice(index, 1);
    setColumns([...columns]);
  };

  const createNewBoardFunc = () => {
    if (contextValue != null) {
      const { createNewBoard } = contextValue;
      createNewBoard({
        name: boardName,
        columns,
      });
      setAddBoardModal(false);
      setColumns([]);
    }
  };

  if (ThemeContextValue != null) {
    const { theme } = ThemeContextValue;
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
          <Button onClick={addNewColumn} theme={theme} isSecondary>
            + Add New Column
          </Button>
          <Button onClick={createNewBoardFunc} theme={theme}>
            Create New Board
          </Button>
          <StyledCloseModal onClick={() => setAddBoardModal(false)}>
            X
          </StyledCloseModal>
        </StyledContainer>
      </Modal>
    ) : null;
  }
  return null;
};

export default AddNewBoard;
